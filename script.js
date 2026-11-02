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
