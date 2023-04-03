const generateTaskUI = ({
  name,
  description = "description",
  action = "action",
}) => {
  const taskHeader = `<div class="task-header">${name}</div>`;
  const taskDescription = `
    <div class="task-description">
      ${description}
      <div class="what-to-do">What do you want to do?</div>
    </div>
  `;
  const taskActionButton = `<button onclick="handleAction(event)">${action}</button>`;
  const taskAction = `<div class="task-action">${taskActionButton}</div>`;
  const taskBody = `<div class="task-body">${taskDescription}${taskAction}</div>`;
  const task = `<div class="task">${taskHeader}${taskBody}</div>`;

  return task;
};

const generateTaskCompleteUI = ({ explanation = "explanation" }) => {
  const taskHeader = `<div class="task-header">Task Complete</div>`;
  const taskExplanation = `<div class="task-explanation">${explanation}</div>`;
  const taskContinueButton = `<button onclick="handleContinue(event)">Continue</button>`;
  const taskContinue = `<div class="task-continue">${taskContinueButton}</div>`;
  const taskBody = `<div class="task-body">${taskExplanation}${taskContinue}</div>`;
  const task = `<div class="task">${taskHeader}${taskBody}</div>`;
  return task;
};

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

const correctAction = `<div class="task-correct">Correct!</div>`;

function handleAction(e) {
  e.preventDefault();
  removeAllChildNodes(taskElement.firstChild);
  taskElement.firstChild.innerHTML += correctAction;

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function clearTaskExplanation() {
    await wait(1000);
    removeAllChildNodes(taskElement.firstChild);
  }

  clearTaskExplanation().then(() => {
    taskElement.innerHTML = generateTaskCompleteUI(currentTask);
  });
}

function handleContinue(e) {
  e.preventDefault();
  taskElement.remove();
  currentTask = null;
  taskElement = null;
  inTask = false;
  zoomOut();
}

function removeAllChildNodes(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}
