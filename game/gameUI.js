let levelTasks = [];
let levelName = null;
let currentTask = 0;

function generateGameUI(level) {
  levelTasks = level.tasks;
  levelName = level.name;

  console.log(level);
  const taskCounter = `<div class="task-counter">${currentTask}/${levelTasks.length}</div>`;
  const taskTracker = `<div class="task-tracker">
  <div class="current-task">
  ${levelTasks[currentTask].name}
  </div>
  </div>`;
  const gameUIContainer = `<div class="game-ui-container">${taskCounter}${taskTracker}</div>`;
  const gameUI = createElement(gameUIContainer);
  document.body.appendChild(gameUI);
}

updateUI = () => {
  currentTask++;
  const taskCounter = document.getElementsByClassName("task-counter")[0];
  const taskTracker = document.getElementsByClassName("task-tracker")[0];
  taskCounter.innerHTML = `${currentTask}/${levelTasks.length}`;
  if (currentTask >= levelTasks.length) {
    return;
  }
  taskTracker.innerHTML = `<div class="current-task">${levelTasks[currentTask].name}</div>`;
};

function gameComplete() {
  console.log("game complete");
  taskElement = createElement(`
  <div class="task">
  <div class="task-header">Good Job!</div>
  <div class="task-body">
    <div class="task-description">
      <div class="description">You have completed the first level of FireSmart BC Homeowner's Prep!</div>
      <img src="../images/success.gif"/>
      <div class="link">Click <a href="https://firesmartbc.ca/">here</a> to learn more about the potential impacts of wildfire on your home.</div>
    </div>
    <div class="task-continue">
    <button onclick="handleRedirect(event)">Continue</button>
  </div>
</div>
</div>
  `);
  document.body.appendChild(taskElement);
}
