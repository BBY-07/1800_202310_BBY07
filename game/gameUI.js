let levelTasks = [];
let levelName = null;
let currentTask = 0;

function generateGameUI (level) {
  levelTasks = level.tasks;
  levelName = level.name;

  console.log(level)
  const taskCounter = `<div class="task-counter">${currentTask}/${levelTasks.length}</div>`;
  const taskTracker = `<div class="task-tracker">${levelTasks[currentTask].name}</div>`;
  const gameUIContainer = `<div class="game-ui-container">${taskCounter}${taskTracker}</div>`;
  const gameUI = createElement(gameUIContainer);
  document.body.appendChild(gameUI);
}

updateUI = () => {
  currentTask++;
  if (currentTask >= levelTasks.length) {
    gameComplete();
    return;
  }
  const taskCounter = document.getElementsByClassName("task-counter")[0];
  const taskTracker = document.getElementsByClassName("task-tracker")[0];
  taskCounter.innerHTML = `${currentTask}/${levelTasks.length}`;
  taskTracker.innerHTML = levelTasks[currentTask].name;
}

function gameComplete() {
  //implement game complete
}
