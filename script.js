const palettes = [
  { id: "garden", name: "Garden", themeColor: "#fff7e8" },
  { id: "twilight", name: "Twilight", themeColor: "#f3f1ff" },
  { id: "blossom", name: "Blossom", themeColor: "#fff3ee" },
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

// A small shift between illustration layers creates depth without a 3D library.
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const hero = document.querySelector(".hero");

if (hero && finePointer.matches) {
  hero.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches) return;
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    hero.style.setProperty("--garden-x", `${(x * 12).toFixed(1)}px`);
    hero.style.setProperty("--garden-y", `${(y * 8).toFixed(1)}px`);
    hero.style.setProperty("--garden-back-x", `${(x * -3).toFixed(1)}px`);
    hero.style.setProperty("--garden-back-y", `${(y * -2).toFixed(1)}px`);
    hero.style.setProperty("--garden-turn", `${(x * 2).toFixed(1)}deg`);
  });

  hero.addEventListener("pointerleave", () => {
    for (const name of ["--garden-x", "--garden-y", "--garden-back-x", "--garden-back-y", "--garden-turn"]) {
      hero.style.removeProperty(name);
    }
  });

  for (const card of document.querySelectorAll(".step")) {
    card.addEventListener("pointermove", (event) => {
      if (reducedMotion.matches) return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--card-rx", `${(-y * 5).toFixed(1)}deg`);
      card.style.setProperty("--card-ry", `${(x * 5).toFixed(1)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--card-rx");
      card.style.removeProperty("--card-ry");
    });
  }
}
