/** Drop your MP3s in public/audio/ */
export const UI_CLICK_AUDIO = "/audio/re4-ui-click.mp3";
export const TITLE_THEME_AUDIO = "/audio/re4-title-theme.mp3";
export const TITLE_NAV_AUDIO = "/audio/re4-title-nav.mp3";

export const UI_CLICK_VOLUME = 0.6;
const TITLE_THEME_VOLUME = 0.4;
const TITLE_NAV_VOLUME = 0.55;

let audioUnlocked = false;
let clickAudio: HTMLAudioElement | null = null;
let themeAudio: HTMLAudioElement | null = null;

let audioCtx: AudioContext | null = null;
let navBuffer: AudioBuffer | null = null;
let themeBuffer: AudioBuffer | null = null;
let themeGain: GainNode | null = null;
let themeSource: AudioBufferSourceNode | null = null;
let buffersLoading: Promise<void> | null = null;

export function shouldPlayUiAudio(): boolean {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getClickAudio(): HTMLAudioElement {
  if (!clickAudio) {
    clickAudio = new Audio(UI_CLICK_AUDIO);
    clickAudio.volume = UI_CLICK_VOLUME;
    clickAudio.preload = "auto";
    clickAudio.load();
  }
  return clickAudio;
}

function getThemeAudio(): HTMLAudioElement {
  if (!themeAudio) {
    themeAudio = new Audio(TITLE_THEME_AUDIO);
    themeAudio.loop = false;
    themeAudio.volume = TITLE_THEME_VOLUME;
    themeAudio.preload = "auto";
    themeAudio.load();
  }
  return themeAudio;
}

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

async function loadAudioBuffer(url: string): Promise<AudioBuffer> {
  const ctx = getAudioContext();
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  return ctx.decodeAudioData(data);
}

function ensureBuffersLoaded(): Promise<void> {
  if (navBuffer && themeBuffer) {
    return Promise.resolve();
  }
  if (!buffersLoading) {
    buffersLoading = Promise.all([
      loadAudioBuffer(TITLE_NAV_AUDIO),
      loadAudioBuffer(TITLE_THEME_AUDIO),
    ]).then(([nav, theme]) => {
      navBuffer = nav;
      themeBuffer = theme;
    });
  }
  return buffersLoading;
}

async function resumeAudioContext(): Promise<boolean> {
  if (!shouldPlayUiAudio()) return false;
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return false;
    }
  }
  return ctx.state === "running";
}

function startThemeWebAudio(): void {
  if (!themeBuffer || !audioCtx || audioCtx.state !== "running") return;

  stopTitleTheme();

  themeSource = audioCtx.createBufferSource();
  themeSource.buffer = themeBuffer;
  themeSource.loop = false;

  themeGain = audioCtx.createGain();
  themeGain.gain.value = TITLE_THEME_VOLUME;

  themeSource.connect(themeGain);
  themeGain.connect(audioCtx.destination);
  themeSource.start(0);
}

function startThemeHtmlFallback(): void {
  const theme = getThemeAudio();
  theme.volume = TITLE_THEME_VOLUME;
  theme.currentTime = 0;

  const play = () => {
    void theme.play().catch(() => {});
  };

  if (theme.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
    play();
    return;
  }

  const onReady = () => {
    theme.removeEventListener("canplaythrough", onReady);
    theme.currentTime = 0;
    play();
  };
  theme.addEventListener("canplaythrough", onReady);
}

/** Prime click during a user gesture so later UI sounds work. */
function primeClickAudio(): void {
  const click = getClickAudio();
  const savedVolume = click.volume;
  click.volume = 0;
  click.currentTime = 0;
  void click
    .play()
    .then(() => {
      click.pause();
      click.currentTime = 0;
      click.volume = savedVolume;
    })
    .catch(() => {
      click.volume = savedVolume;
    });
}

export function preloadUiClickSound(): void {
  getClickAudio();
}

export function preloadTitleAudio(): void {
  getClickAudio();
  getThemeAudio();
  void ensureBuffersLoaded();
}

export function isTitleAudioUnlocked(): boolean {
  return audioUnlocked;
}

/** Call from a user gesture (click, keydown, touch). Returns true on first unlock. */
export function unlockTitleAudio(): boolean {
  if (!shouldPlayUiAudio()) return false;

  const wasFirstUnlock = !audioUnlocked;
  if (wasFirstUnlock) {
    audioUnlocked = true;
    primeClickAudio();
    void (async () => {
      const running = await resumeAudioContext();
      await ensureBuffersLoaded();
      if (running) {
        startThemeWebAudio();
      } else {
        startThemeHtmlFallback();
      }
    })();
  }

  return wasFirstUnlock;
}

/** Play nav sound — works on hover once audio is unlocked (Web Audio keeps running). */
export function playTitleNavSound(): void {
  if (!shouldPlayUiAudio()) return;

  if (audioCtx?.state === "running" && navBuffer) {
    const source = audioCtx.createBufferSource();
    source.buffer = navBuffer;
    const gain = audioCtx.createGain();
    gain.gain.value = TITLE_NAV_VOLUME;
    source.connect(gain);
    gain.connect(audioCtx.destination);
    source.start(0);
    return;
  }

  if (!audioUnlocked) return;

  const sfx = new Audio(TITLE_NAV_AUDIO);
  sfx.volume = TITLE_NAV_VOLUME;
  sfx.currentTime = 0;
  void sfx.play().catch(() => {});
}

export function stopTitleTheme(): void {
  if (themeSource) {
    try {
      themeSource.stop();
    } catch {
      // already stopped
    }
    themeSource.disconnect();
    themeSource = null;
  }
  if (themeGain) {
    themeGain.disconnect();
    themeGain = null;
  }
  if (themeAudio) {
    themeAudio.pause();
    themeAudio.currentTime = 0;
  }
}

export function playUiClickSound(): void {
  if (!shouldPlayUiAudio()) return;
  if (!audioUnlocked) {
    unlockTitleAudio();
  }
  const sfx = getClickAudio();
  sfx.volume = UI_CLICK_VOLUME;
  sfx.currentTime = 0;
  void sfx.play().catch(() => {});
}

/** Try to unlock and play nav — call from hover handlers. */
export function playTitleNavOnHover(): void {
  if (!shouldPlayUiAudio()) return;
  if (!audioUnlocked) {
    unlockTitleAudio();
  }
  playTitleNavSound();
}
