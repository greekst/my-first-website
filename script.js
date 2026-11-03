const palettes = [
  { id: "sunny", name: "Sunny", themeColor: "#fff9ed" },
  { id: "candy", name: "Candy", themeColor: "#fff4fa" },
  { id: "fresh", name: "Fresh", themeColor: "#f1fcf6" },
];

const button = document.querySelector("#palette-button");
const status = document.querySelector("#palette-status");
const themeColor = document.querySelector('meta[name="theme-color"]');
let paletteIndex = 0;

button.addEventListener("click", () => {
  paletteIndex = (paletteIndex + 1) % palettes.length;
  const palette = palettes[paletteIndex];

  document.documentElement.dataset.theme = palette.id;
  status.textContent = `${palette.name} palette`;
  themeColor.content = palette.themeColor;
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const sceneDuration = 1600;

for (const card of document.querySelectorAll(".step[data-step]")) {
  const action = card.querySelector(".step-action");
  const lesson = card.querySelector(".step-lesson");
  const announcement = card.querySelector(".step-announcement");
  let timer;
  let revealed = false;

  lesson.hidden = true;
  action.hidden = false;

  action.addEventListener("click", () => {
    window.clearTimeout(timer);
    card.classList.remove("is-playing", "is-revealed");

    if (reducedMotion.matches) {
      card.classList.add("is-revealed");
      revealLesson();
      return;
    }

    // Restart from the first frame, even when the button is pressed mid-scene.
    void card.offsetWidth;
    card.classList.add("is-playing");
    action.textContent = "Restart";
    timer = window.setTimeout(() => {
      card.classList.remove("is-playing");
      card.classList.add("is-revealed");
      revealLesson();
    }, sceneDuration);
  });

  function revealLesson() {
    if (!revealed) {
      lesson.hidden = false;
      announcement.textContent = lesson.textContent;
      revealed = true;
    }
    action.textContent = "Replay";
  }
}
