const tutorialData = [
  {
    header: "How do wildfires grow and spread?",
    subheader: "How wildfires grow",
    secondarySubheader: "Fuel",
    body: "It’s simple: to grow, wildfire needs fuel such as trees or other vegetation, as well as unmitigated homes. Importantly, some vegetation, such as coniferous trees, are highly flammable. Others, such as deciduous (leafy) trees, are much less flammable.",
    image: "fuel.gif",
  },
  {
    header: "How do wildfires grow and spread?",
    subheader: "How wildfires spread",
    secondarySubheader: "Embers",
    body: "Embers or firebrands are the burning debris that can be cast up to two kilometres ahead of a wildfire, by wind or energy from the fire. Embers can ignite materials on or near your home, causing severe damage or total home loss. Once homes or adjacent materials begin burning, they can continue casting embers further into the community.",
    image: "embers.gif",
  },
  {
    header: "How to create a FireSmart property",
    body: "By taking action and creating a FireSmart property, you will dramatically increase the resistance of your home and property to damage caused by wildfire. The best part is, it's surprisingly easy to do. The actions recommended in this manual start from the home, and progress outward. Changes made to the area closest to your home, and your home itself, have the greatest potential to reduce the risk of wildfire damage.",
    image: "zone.gif",
  },
  {
    header: "Let's get started!",
    body: "Learn how to prepare your home with our interactive game. Complete the tasks by clicking on the corresponding elements to prepare the house for a potential wildfire!",
    image: "start.webp",
  },
];

const contentContainer = document.querySelector("#content-container");
const header = document.querySelector("#header h1");
const subheader = document.querySelector("#sub-header h2");
const secondarySubheader = document.querySelector("#secondary-sub-header h2");
const explanation = document.querySelector("#explanation");
const image = document.querySelector("#image");

let currentDataIndex = 0;
populateSkeleton(currentDataIndex);

function populateSkeleton(index) {
  const data = tutorialData[index];
  header.textContent = data.header;
  subheader.textContent = data.subheader;
  secondarySubheader.textContent = data.secondarySubheader;
  explanation.textContent = data.body;
  image.src = `./images/${data.image}`;
}

function handleTutorialButton() {
  currentDataIndex++;
  if (currentDataIndex === tutorialData.length) {
    currentDataIndex = 0;
  }

  //If current index is last
  if (currentDataIndex === tutorialData.length - 1) {
    const button = document.querySelector("#tutorial-button");
    button.textContent = "Start";
    //Redirect to game.html
    button.onclick = () => {
      window.location.href = "./game.html";
    };
  }
  populateSkeleton(currentDataIndex);
}
