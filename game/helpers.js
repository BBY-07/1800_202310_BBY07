const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createElement(content, className = null) {
  const element = document.createElement("div");
  element.innerHTML = content;
  return element;
}

function removeElement(element) {
  element.remove();
}

async function clearElement() {
  await wait(2000);
  removeAllChildNodes(taskElement.firstChild);
}

function removeAllChildNodes(parentElement) {
  console.log(parentElement);
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}