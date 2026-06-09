/** Drop your MP3 at public/audio/re4-ui-click.mp3 */
export const UI_CLICK_AUDIO = "/audio/re4-ui-click.mp3";
export const UI_CLICK_VOLUME = 0.6;

let clickAudio: HTMLAudioElement | null = null;

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

export function preloadUiClickSound(): void {
  getClickAudio();
}

export function playUiClickSound(): void {
  if (!shouldPlayUiAudio()) return;
  const sfx = getClickAudio();
  sfx.currentTime = 0;
  void sfx.play().catch(() => {});
}
