// Complete variable definitions and random functions

const customName = document.getElementById("customname");
const generateBtn = document.querySelector(".generate");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// Raw text strings

// Willy the Goblin
// Big Daddy
// Father Christmas

// the soup kitchen
// Disneyland
// the White House

// spontaneously combusted
// melted into a puddle on the sidewalk
// turned into a slug and slithered away

let pessoas = [
  "Leia Skywalker",
  "Luke Skywalker",
  "Han Solo",
  "Darth Vader",
  "Obi-Wan Kenobi",
  "Yoda",
];

let locais = [
  "Sarlacc pit",
  "Tatooine",
  "The Death Star",
  "Endor",
  "Hoth",
  "Dagobah",
];

let acoes = [
  "used the Force to levitate and leave the battle",
  "choke slammed Sarlacc using the Force",
  "shot Greedo in the face",
  "used a lightsaber to cut a stormtrooper in half",
  "force pushed a rock to crush the stormtroopers",
  "force pulled a blaster out of a stormtrooper's hand",
];

// Partial return random string function

function returnRandomStoryString() {
  let storyText =
    "It was 100 Fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: has 300 pounds of pure Force, and it was a hot day.";

  storyText = storyText.replaceAll(":insertx:", randomValueFromArray(pessoas));
  storyText = storyText.replaceAll(":inserty:", randomValueFromArray(locais));
  storyText = storyText.replaceAll(":insertz:", randomValueFromArray(acoes));

  return storyText;
}

// Event listener and partial generate function definition

generateBtn.addEventListener("click", generateStory);

function generateStory() {
  let storyText = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    storyText = storyText.replaceAll("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 * 0.453592);
    const temperature = Math.round((5 / 9) * (100 - 32));

    storyText = storyText.replaceAll("300 pounds", `${weight} kg`);
    storyText = storyText.replaceAll("100 Fahrenheit", `${temperature} Celsius`);
  }

  // TODO: replace "" with the correct expression
  story.textContent = storyText;
  story.style.visibility = "visible";
}
