const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createTaskElement(content) {
  const element = document.createElement("div");
  element.innerHTML = content;
  return element;
}

function removeTaskElement(element) {
  element.remove();
}

async function clearTaskExplanation() {
  await wait(2000);
  removeAllChildNodes(taskElement.firstChild);
}

function removeAllChildNodes(parentElement) {
  console.log(parentElement);
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}