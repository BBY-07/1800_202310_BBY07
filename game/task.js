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
