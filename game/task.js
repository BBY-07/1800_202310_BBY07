
let inTask = false;
let taskElement = null;
let currentTask = null;

const handleClickTask = (square) => {
  inTask = !inTask;
  if (inTask) {
    currentTask = square;
    taskElement = document.createElement("div");
    taskElement.innerHTML = generateTaskUI(square);
    document.body.appendChild(taskElement);
  } else {
    currentTask = null;
    taskElement.remove();
  }
};

const handleAction = (e) => {
  e.preventDefault();
  zoomOut();
};
