let isPanning = false;
let startX, startY;
let offsetX = 0;
let offsetY = 0;
let isZoomed = false;

function startPanning(e) {
  if (isZoomed) return;
  e.preventDefault();
  isPanning = true;

  if (e.type === "touchstart") {
    startX = e.touches[0].clientX - offsetX;
    startY = e.touches[0].clientY - offsetY;
  } else {
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
  }
}

function panImage(e) {
  e.preventDefault();
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

  offsetX = newOffsetX;
  offsetY = newOffsetY;

  redrawImage();
}

function stopPanning() {
  isPanning = false;
}

function zoomOnSquareClick(e) {
  if (isZoomed) return;
  const { x: mouseX, y: mouseY } = getPointerCoordinates(e);

  squares.forEach((square, index) => {
    const left = offsetX + square.x * scaleFactor;
    const right = left + square.width * scaleFactor;
    const top = offsetY + square.y * scaleFactor;
    const bottom = top + square.height * scaleFactor;

    if (mouseX > left && mouseX < right && mouseY > top && mouseY < bottom) {
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

canvas.addEventListener("mousemove", panImage);
canvas.addEventListener("mouseup", stopPanning);
canvas.addEventListener("mouseleave", stopPanning);

canvas.addEventListener("touchmove", panImage);
canvas.addEventListener("touchcancel", stopPanning);

const fastTapThreshold = 150; // In milliseconds
let touchStartTime;
let touchStartEvent;
let clickStartTime;
let clickStartEvent;

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
