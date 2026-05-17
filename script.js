const journal = document.getElementById("journal");
const intro = document.getElementById("intro");
const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("prev-page");
const pageIndicator = document.getElementById("page-indicator");
const pages = Array.from(document.querySelectorAll(".page"));
const compassNeedle = document.querySelector(".needle");
const routePath = document.getElementById("route-path");
const soundToggle = document.getElementById("sound-toggle");
const timeMode = document.getElementById("time-mode");
const dustLayer = document.getElementById("dust-layer");
const leavesLayer = document.getElementById("leaves-layer");
const fireflyLayer = document.getElementById("firefly-layer");
const letterForm = document.getElementById("letter-form");
const letterStatus = document.getElementById("letter-status");

let currentPage = 0;
let journalOpened = false;
let ambienceOn = false;
let audioContext;
let ambienceNodes;
let noiseBuffer;
let idleTimer;
const ROUTE_LENGTH =
  Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--route-length")) || 760;
const WAX_ANIMATION_DURATION_MS = 600;

const updatePage = () => {
  pages.forEach((page, i) => page.classList.toggle("active", i === currentPage));
  pageIndicator.textContent = `Page ${currentPage + 1} / ${pages.length}`;
};

const openJournal = () => {
  if (journalOpened) return;
  journalOpened = true;
  journal.classList.remove("closed");
  journal.classList.add("open");
};

journal.addEventListener("click", openJournal);
journal.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openJournal();
  }
});

let dragStartX = 0;
journal.addEventListener("pointerdown", (e) => {
  dragStartX = e.clientX;
  journal.setPointerCapture(e.pointerId);
});

journal.addEventListener("pointerup", (e) => {
  if (Math.abs(e.clientX - dragStartX) > 38) openJournal();
});

nextPageBtn.addEventListener("click", () => {
  openJournal();
  currentPage = (currentPage + 1) % pages.length;
  updatePage();
});

prevPageBtn.addEventListener("click", () => {
  openJournal();
  currentPage = (currentPage - 1 + pages.length) % pages.length;
  updatePage();
});

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = (e.clientY / window.innerHeight) * 2 - 1;

  intro.style.transform = `translate(${x * -2}px, ${y * -2}px)`;
  if (compassNeedle) {
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    compassNeedle.style.transform = `rotate(${angle}deg)`;
  }

  clearTimeout(idleTimer);
  document.body.classList.remove("idle");
  idleTimer = setTimeout(() => document.body.classList.add("idle"), 7000);
});

window.addEventListener("scroll", () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  routePath.style.strokeDashoffset = `${ROUTE_LENGTH - ratio * ROUTE_LENGTH}`;
  document.body.classList.toggle("deep-scroll", ratio > 0.35);
});

const spawnParticles = (layer, count, className, sizeRange = [2, 6], durationRange = [8, 20]) => {
  for (let i = 0; i < count; i += 1) {
    const el = document.createElement("span");
    el.className = className;
    const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
    const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0]);
    const delay = -Math.random() * duration;

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${Math.random() * 100}%`;
    el.style.top = `${Math.random() * 100}%`;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
    layer.appendChild(el);
  }
};

spawnParticles(dustLayer, 70, "dust", [1, 4], [10, 22]);
spawnParticles(leavesLayer, 20, "leaf", [8, 14], [8, 18]);

const setTimeMode = () => {
  const hour = new Date().getHours();
  const night = hour >= 19 || hour < 6;
  document.body.classList.toggle("night", night);
  timeMode.textContent = night ? "Night Field Log" : "Day Field Log";

  fireflyLayer.innerHTML = "";
  if (night) {
    spawnParticles(fireflyLayer, 28, "firefly", [4, 7], [2, 5]);
  }
};

setTimeMode();
setInterval(setTimeMode, 60000);

const createAmbience = async () => {
  if (ambienceNodes && !ambienceNodes.stopped) return;

  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") await audioContext.resume();

  if (!noiseBuffer) {
    noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * 0.3;
  }

  const noiseSource = audioContext.createBufferSource();
  noiseSource.buffer = noiseBuffer;
  noiseSource.loop = true;

  const noiseFilter = audioContext.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 900;

  const windGain = audioContext.createGain();
  windGain.gain.value = 0.015;

  const crackleOsc = audioContext.createOscillator();
  crackleOsc.type = "triangle";
  crackleOsc.frequency.value = 140;

  const crackleGain = audioContext.createGain();
  crackleGain.gain.value = 0.01;

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(windGain);
  windGain.connect(audioContext.destination);

  crackleOsc.connect(crackleGain);
  crackleGain.connect(audioContext.destination);

  noiseSource.start();
  crackleOsc.start();

  ambienceNodes = { noiseSource, crackleOsc, stopped: false };
};

const stopAmbience = () => {
  if (!ambienceNodes || ambienceNodes.stopped) return;
  ambienceNodes.stopped = true;
  try {
    ambienceNodes.noiseSource.stop();
  } catch (error) {
    console.warn("Failed to stop ambience noise source.", error);
  }
  try {
    ambienceNodes.crackleOsc.stop();
  } catch (error) {
    console.warn("Failed to stop ambience crackle oscillator.", error);
  }
  ambienceNodes = null;
};

soundToggle.addEventListener("click", async () => {
  ambienceOn = !ambienceOn;
  soundToggle.setAttribute("aria-pressed", String(ambienceOn));
  soundToggle.textContent = `Forest Ambience: ${ambienceOn ? "On" : "Off"}`;

  if (ambienceOn) {
    await createAmbience();
  } else {
    stopAmbience();
  }
});

letterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  letterStatus.textContent = "Your letter has been sealed with wax and placed in the cabin post.";
  letterForm.reset();

  const submitBtn = letterForm.querySelector(".wax-submit");
  submitBtn.animate(
    [
      { transform: "scale(1) rotate(0deg)" },
      { transform: "scale(1.08) rotate(-2deg)" },
      { transform: "scale(1) rotate(0deg)" },
    ],
    { duration: WAX_ANIMATION_DURATION_MS, easing: "ease-out" }
  );
});

updatePage();
