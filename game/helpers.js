// Define a function to wait for a given amount of time
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Define a function to create a new HTML element with the given content and class name
function createElement(content, className = null) {
const element = document.createElement("div");
element.innerHTML = content;
return element;
}

// Define a function to remove an HTML element from the document
function removeElement(element) {
element.remove();
}

// Define an async function to clear the content of an HTML element after a delay
async function clearElement() {
await wait(2000);
removeAllChildNodes(taskElement.firstChild);
}

// Define a function to remove all child nodes of an HTML element
function removeAllChildNodes(parentElement) {
while (parentElement.firstChild) {
parentElement.removeChild(parentElement.firstChild);
}
}