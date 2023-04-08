// Define some variables to keep track of the state of the image display
let isPanning = false; // Whether the user is currently panning the image
let startX, startY; // The initial position of the pointer when panning started
let offsetX = 0; // The current horizontal offset of the image
let offsetY = 0; // The current vertical offset of the image
let isZoomed = false; // Whether the image is currently zoomed in

// Function to handle the start of panning
function startPanning(e) {
  // Do nothing if the image is zoomed in
  if (isZoomed) return;
  e.preventDefault(); 
  isPanning = true; // Indicate that panning has started

  // Get the initial position of the pointer
  if (e.type === "touchstart") {
    startX = e.touches[0].clientX - offsetX;
    startY = e.touches[0].clientY - offsetY;
  } else {
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
  }
}

// Function to handle panning
function panImage(e) {
  e.preventDefault(); // Prevent default behavior of the pointer event
  if (!isPanning) return; // Only pan when the pointer is pressed down
  let newOffsetX, newOffsetY;
  // Calculate new offsets based on the difference between the current and initial pointer positions
  if (e.type === "touchmove") {
    newOffsetX = e.touches[0].clientX - startX;
    newOffsetY = e.touches[0].clientY - startY;
  } else {
    newOffsetX = e.clientX - startX;
    newOffsetY = e.clientY - startY;
  }

  // Prevent panning the image beyond its edges
  const scaledWidth = image.width * scaleFactor;
  const scaledHeight = canvas.height; // Since we scale the image to the canvas height
  if (newOffsetX > 0) newOffsetX = 0;
  if (newOffsetY > 0) newOffsetY = 0;
  if (newOffsetX < -(scaledWidth - canvas.width))
    newOffsetX = -(scaledWidth - canvas.width);
  if (newOffsetY < -(scaledHeight - canvas.height))
    newOffsetY = -(scaledHeight - canvas.height);

  offsetX = newOffsetX; // Set the new horizontal offset
  offsetY = newOffsetY; // Set the new vertical offset

  redrawImage(); // Redraw the image on the canvas
}

// Function to handle the end of panning
function stopPanning() {
  isPanning = false; 
}

// Function to handle zooming in on a square
function zoomOnSquareClick(e) {
  if (isZoomed) return; // Do nothing if the image is already zoomed in
  const { x: mouseX, y: mouseY } = getPointerCoordinates(e);

  // Check if the pointer is inside any of the squares
  squares.forEach((square, index) => {
    const left = offsetX + square.x * scaleFactor;
    const right = left + square.width * scaleFactor;
    const top = offsetY + square.y * scaleFactor;
    const bottom = top + square.height * scaleFactor;
    if (mouseX > left && mouseX < right && mouseY > top && mouseY < bottom) {
      // Zoom in on the square if it was clicked
      if (zoomedSquareIndex === index) {
        isZoomed = false;
        zoomedSquareIndex = null;
        zoomTo(defaultScaleFactor, square);
      } else {
        isZoomed = true;
        zoomedSquareIndex = index;
        const zoomLevel = 3;
        zoomTo(zoomLevel, square);
        handleClickTask(square);
      }
    }
  });
}

// Add event listeners for mouse and touch events to handle panning and zooming
canvas.addEventListener("mousemove", panImage);
canvas.addEventListener("mouseup", stopPanning);
canvas.addEventListener("mouseleave", stopPanning);

canvas.addEventListener("touchmove", panImage);
canvas.addEventListener("touchcancel", stopPanning);

// Define a threshold for fast taps
const fastTapThreshold = 150; // In milliseconds
let touchStartTime;
let touchStartEvent;
let clickStartTime;
let clickStartEvent;

// Add event listeners for touch and click events to handle fast taps
canvas.addEventListener("touchstart", (e) => {
  touchStartTime = new Date().getTime();
  touchStartEvent = e;
  startPanning(e);
});

canvas.addEventListener("touchend", (e) => {
  stopPanning();
  const touchEndTime = new Date().getTime();
  const touchDuration = touchEndTime - touchStartTime;

  if (touchDuration < fastTapThreshold) {
    zoomOnSquareClick(touchStartEvent);
  }
});

canvas.addEventListener("mousedown", (e) => {
  clickStartTime = new Date().getTime();
  clickStartEvent = e;
  startPanning(e);
});

canvas.addEventListener("mouseup", (e) => {
  stopPanning();
  const clickEndTime = new Date().getTime();
  const clickDuration = clickEndTime - clickStartTime;

  if (clickDuration < fastTapThreshold) {
    zoomOnSquareClick(clickStartEvent);
  }
});
