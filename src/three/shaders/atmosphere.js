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

    // Base ink palette — extremely dark base.
    vec3 base = mix(vec3(0.039, 0.055, 0.082), vec3(0.051, 0.067, 0.094), uv.y);

    // Mood color — emerald vs cyan.
    vec3 cool = vec3(0.357, 0.753, 0.745); // #5BC0BE
    vec3 warm = vec3(0.180, 0.545, 0.341); // #2E8B57
    vec3 accent = mix(cool, warm, uMood);

    // Slow drifting fog cells.
    float t  = uTime * 0.04;
    float n1 = fbm(p * 1.8 + vec2(t, -t * 0.6));
    float n2 = fbm(p * 3.2 + vec2(-t * 0.7, t * 0.3));
    float fog = smoothstep(0.25, 0.95, n1 * 0.6 + n2 * 0.4);

    // Horizon glow following mouse y.
    float h = 1.0 - smoothstep(0.0, 0.55, abs(uv.y - mix(0.62, 0.45, uMouse.y)));
    h = pow(h, 2.6);

    // Soft radial vignette around center-ish.
    float vig = 1.0 - smoothstep(0.55, 1.05, length(p));

    vec3 color = base;
    color += accent * fog * 0.05 * uIntensity;
    color += accent * h   * 0.08 * uIntensity;
    color *= mix(0.78, 1.0, vig);

    // Subtle horizontal scanlines.
    float scan = 0.96 + 0.04 * sin(uv.y * uResolution.y * 1.4);
    color *= scan;

    // Final gentle gamma + grain hint.
    float g = (hash(uv * uResolution + uTime) - 0.5) * 0.012;
    color += g;

    gl_FragColor = vec4(color, 1.0);
  }
`;
