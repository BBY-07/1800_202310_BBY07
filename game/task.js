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

//Render Checkmark
function handleAction(e) {
  e.preventDefault();
  const correctAction = `

  <div class="task-header">Task Complete!</div>
    <div class="task-body">
      <div class="w4rAnimated_checkmark">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle
            class="path circle"
            fill="none"
            stroke="#73AF55"
            stroke-width="6"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <polyline
            class="path check"
            fill="none"
            stroke="#73AF55"
            stroke-width="6"
            stroke-linecap="round"
            stroke-miterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        </svg>
      </div>
    </div>

  `;

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
  if (currentTask >= levelTasks.length) {
    gameComplete();
  }
}

function handleRedirect(e) {
  e.preventDefault();
  window.location.href = "../../dashboard.html";
}
