let zoomedSquareIndex = null;
const defaultScaleFactor = 1;

const squares = [
  { x: 100, y: 100, width: 50, height: 50 },
  { x: 1200, y: 500, width: 50, height: 50 },
  { x: 1050, y: 1700, width: 50, height: 50 },
];

function drawSquare(square) {
  ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
  ctx.fillRect(
    offsetX + square.x * scaleFactor,
    offsetY + square.y * scaleFactor,
    square.width * scaleFactor,
    square.height * scaleFactor
  );
}

function getPointerCoordinates(e) {
  if (e.type === "touchstart") {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  } else {
    return { x: e.clientX, y: e.clientY };
  }
}

function zoomTo(targetScaleFactor, square) {
  const newScaleFactor = targetScaleFactor * (canvas.height / image.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const squareCenterX = square.x + square.width / 2;

  const squareCenterY = square.y + square.height / 2;

  offsetX = centerX - squareCenterX * newScaleFactor;
  offsetY = centerY - squareCenterY * newScaleFactor;

  scaleFactor = newScaleFactor;

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
