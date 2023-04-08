// Initialize the index of the zoomed square and the default scale factor
let zoomedSquareIndex = null;
const defaultScaleFactor = 1;

// Function to draw a square on the canvas
function drawSquare(square) {
  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(
    offsetX + square.x * scaleFactor,
    offsetY + square.y * scaleFactor,
    square.width * scaleFactor,
    square.height * scaleFactor
  );
}

// Function to get the pointer coordinates from an event
function getPointerCoordinates(e) {
  if (e.type === "touchstart") {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  } else {
    return { x: e.clientX, y: e.clientY };
  }
}

// Function to zoom in on a square
function zoomTo(targetScaleFactor, square) {
  // Calculate the new scale factor and offset values based on the 
  // target scale factor and the center of the selected square
  const newScaleFactor = targetScaleFactor * (canvas.height / image.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height * 0.25;
  const squareCenterX = square.x + square.width / 2;
  const squareCenterY = square.y + square.height / 2;
  offsetX = centerX - squareCenterX * newScaleFactor;
  offsetY = centerY - squareCenterY * newScaleFactor;

  scaleFactor = newScaleFactor;

  // Prevent the image from being panned beyond its edges
  const scaledWidth = image.width * scaleFactor;
  const scaledHeight = image.height * scaleFactor;
  if (offsetX > 0) offsetX = 0;
  if (offsetY > 0) offsetY = 0;
  if (offsetX < -(scaledWidth - canvas.width))
    offsetX = -(scaledWidth - canvas.width);
  if (offsetY < -(scaledHeight - canvas.height))
    offsetY = -(scaledHeight - canvas.height);

  redrawImage();
}

// Function to zoom out from a zoomed square
function zoomOut() {
  if (isZoomed) {
    const square = squares[zoomedSquareIndex];
    isZoomed = false;
    zoomedSquareIndex = null;
    zoomTo(defaultScaleFactor, square);
  }
}
