// ─────────────────────────────────────────────────────────────
// Atmospheric background shader.
// Produces a slow-moving volumetric gradient with subtle noise,
// a distant horizon glow, and a faint scanline veil. The mood
// (warm-emerald vs cool-cyan) shifts based on the current zone
// via the `uMood` uniform (0..1).
// ─────────────────────────────────────────────────────────────

export const atmosphereVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const atmosphereFragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uMood;        // 0 = cool/cyan, 1 = warm/emerald
  uniform float uIntensity;   // 0..1 master intensity
  uniform vec2  uMouse;       // normalized 0..1
  uniform vec2  uResolution;

  // Cheap hash + value noise — enough for a soft veil.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02; a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p  = uv - 0.5;
    p.x *= uResolution.x / uResolution.y;

    // Base ink palette — now richer and more chromatic.
    vec3 baseTop = vec3(0.022, 0.034, 0.062);
    vec3 baseMid = vec3(0.038, 0.052, 0.082);
    vec3 baseBot = vec3(0.013, 0.020, 0.034);
    vec3 base = mix(baseBot, baseMid, smoothstep(0.0, 0.62, uv.y));
    base = mix(base, baseTop, smoothstep(0.4, 1.0, uv.y));

    // Mood color — cyan, emerald, violet, with a warm fringe.
    vec3 cool = vec3(0.357, 0.753, 0.745); // #5BC0BE
    vec3 warm = vec3(0.180, 0.545, 0.341); // #2E8B57
    vec3 violet = vec3(0.678, 0.482, 0.973);
    vec3 amber = vec3(0.953, 0.592, 0.172);
    vec3 accent = mix(cool, warm, uMood);

    // Slow drifting fog cells.
    float t  = uTime * 0.04;
    float n1 = fbm(p * 1.8 + vec2(t, -t * 0.6));
    float n2 = fbm(p * 3.2 + vec2(-t * 0.7, t * 0.3));
    float n3 = fbm(p * 4.4 + vec2(t * 0.25, t * 0.14));
    float fog = smoothstep(0.24, 0.95, n1 * 0.45 + n2 * 0.35 + n3 * 0.2);

    // A drifting aurora band that adds more depth and color separation.
    float band = sin((uv.y + uv.x * 0.25 + uTime * 0.03) * 10.0);
    band = smoothstep(0.15, 0.95, band * 0.5 + 0.5);
    vec3 bandColor = mix(violet, accent, uMood * 0.8);

    // Horizon glow following mouse y.
    float h = 1.0 - smoothstep(0.0, 0.55, abs(uv.y - mix(0.62, 0.45, uMouse.y)));
    h = pow(h, 2.6);

    float mouseGlow = 1.0 - smoothstep(0.0, 0.55, length((uv - uMouse) * vec2(uResolution.x / uResolution.y, 1.0)));
    mouseGlow = pow(mouseGlow, 2.0);

    float radial = 1.0 - smoothstep(0.05, 0.95, length(p));

    // Soft radial vignette around center-ish.
    float vig = 1.0 - smoothstep(0.55, 1.05, length(p));

    vec3 color = base;
    color += accent    * fog       * 0.085 * uIntensity;
    color += bandColor * band      * 0.07  * uIntensity;
    color += accent    * h         * 0.10  * uIntensity;
    color += amber     * mouseGlow * 0.06  * uIntensity;
    color += violet    * radial    * 0.04  * uIntensity;
    color *= mix(0.78, 1.0, vig);

    // Subtle horizontal scanlines.
    float scan = 0.95 + 0.05 * sin(uv.y * uResolution.y * 1.65 + uTime * 1.2);
    color *= scan;

    // Final gentle gamma + grain hint.
    float g = (hash(uv * uResolution + uTime) - 0.5) * 0.015;
    color += g;

    color = mix(color, color * vec3(1.06, 1.03, 1.08), smoothstep(0.2, 1.0, uIntensity));

    gl_FragColor = vec4(color, 1.0);
  }
`;
