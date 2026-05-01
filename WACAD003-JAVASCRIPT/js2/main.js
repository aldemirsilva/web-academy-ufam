const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
let images = [
  {
    filename: "the-force-biography-gallery-1_dca2ff85.jpeg",
    alt: "Yoda treinando Luke nos caminhos da Força",
  },
  {
    filename: "the-force-biography-gallery-3_a990896f.jpeg",
    alt: 'Qui-Gon Jinn e Obi-Wan Kenobi antes das "negociações com sabres de luz"',
  },
  {
    filename: "the-force-biography-gallery-14_dee00cf9.jpeg",
    alt: "Anakin sendo apresentado ao conselho Jedi",
  },
  {
    filename: "the-force-biography-gallery-17_6800febd.jpeg",
    alt: "Anakin, Yoda e Obi-Wan tornam-se um com a Força após a morte",
  },
  {
    filename: "the-force-biography-gallery-29_2ff02d45.jpeg",
    alt: "Batalha de Obi-Wan e Conde Dookan",
  },
];

/* Looping through images */

const baseURL = "images/";

for (let i = 0; i < images.length; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", baseURL + images[i].filename);
  newImage.setAttribute("alt", images[i].alt);

  newImage.addEventListener("click", () => {
    displayedImage.setAttribute("src", baseURL + images[i].filename);
    displayedImage.setAttribute("alt", images[i].alt);
  });

  thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener("click", () => {
  const currentClass = btn.getAttribute("class");

  if (currentClass === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    return;
  }

  btn.setAttribute("class", "dark");
  btn.textContent = "Darken";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
});
