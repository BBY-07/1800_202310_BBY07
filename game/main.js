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

//Get level data
async function fetchLevelData() {
  const levelData = await fetch("../levels/levels.json").then((response) =>
    response.json()
  );

  const taskData = await fetch("../levels/tasks.json").then((response) =>
    response.json()
  );

  const level = levelData.levels[0];
  const name = level.name;

  const tasks = level.tasks.map((task) => {
    return taskData.tasks[task];
  });

  return { name, tasks };
}

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
