let inTask = false;
let taskElement = null;
let currentTask = null;

const handleClickTask = (square) => {
  inTask = !inTask;
  if (inTask) {
    currentTask = square;
    taskElement = createTaskElement(generateTaskUI(square));
    document.body.appendChild(taskElement);
  } else {
    removeTaskElement(taskElement);
    currentTask = null;
  }
};

function handleAction(e) {
  const correctAction = `<div class="task-correct">Correct!</div>`;
  e.preventDefault();

  const taskBody = taskElement.getElementsByClassName("task")[0];
  removeAllChildNodes(taskBody);
  taskBody.innerHTML += correctAction;

  clearTaskExplanation().then(() => {
    taskElement.innerHTML = generateTaskCompleteUI(currentTask);
  });
}

function handleContinue(e) {
  e.preventDefault();
  removeTaskElement(taskElement);
  currentTask = null;
  taskElement = null;
  inTask = false;
  zoomOut();
}


