let inTask = false;
let taskElement = null;
let selectedElement = null;

const handleClickTask = (square) => {
  inTask = !inTask;
  if (inTask) {
    selectedElement = square;
    taskElement = createElement(generateTaskUI(square));
    document.body.appendChild(taskElement);
  } else {
    removeElement(taskElement);
    selectedElement = null;
  }
};

function handleAction(e) {
  e.preventDefault();
  const correctAction = `<div class="task-correct">Correct!</div>`;

  updateUI();

  const taskBody = taskElement.getElementsByClassName("task")[0];
  removeAllChildNodes(taskBody);
  taskBody.innerHTML += correctAction;

  clearElement().then(() => {
    taskElement.innerHTML = generateTaskCompleteUI(selectedElement);
  });
}

function handleContinue(e) {
  e.preventDefault();
  removeElement(taskElement);
  selectedElement = null;
  taskElement = null;
  inTask = false;
  zoomOut();
}


