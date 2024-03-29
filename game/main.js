// Function to redraw the image and squares on the canvas
function redrawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    image,
    offsetX,
    offsetY,
    image.width * scaleFactor,
    image.height * scaleFactor
  );
  ctx.fillRect(canvas.width / 2, canvas.height / 2, 5, 5);
  squares.forEach((square) => {
    drawSquare(square);
  });
}

// Array to store the squares
let squares = [];

// Function to fetch level data from JSON files
async function fetchLevelData() {
  const levelData = await fetch("../levels/levels.json").then((response) =>
    response.json()
  );

  const taskData = await fetch("../levels/tasks.json").then((response) =>
    response.json()
  );

  // Extract the relevant data for the current level and its tasks
  const level = levelData.levels[0];
  const name = level.name;
  const tasks = level.tasks.map((task) => {
    return taskData.tasks[task];
  });

  // Create an array of square objects for each task
  squares = tasks.map((task) => {
    const { x, y, width, height } = task.position;
    let name = task.element;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const description = task.description;
    const action = task.action;
    const explanation = task.explanation;
    const gif = task.gif;
    const title = task.title;
    return {
      x,
      y,
      width,
      height,
      name,
      description,
      action,
      explanation,
      gif,
      title,
    };
  });
  return { name, tasks };
}

// Function to initialize the game
async function init() {
  const levelData = await fetchLevelData();
  generateGameUI(levelData);
}

init();

// Initial drawing of squares when the image has loaded
image.onload = () => {
  canvas.height = window.innerHeight;
  scaleFactor = canvas.height / image.height;
  canvas.width = Math.min(image.width * scaleFactor, window.innerWidth);
  ctx.drawImage(image, 0, 0, image.width * scaleFactor, canvas.height);
  squares.forEach((square) => {
    drawSquare(square);
  });
};
