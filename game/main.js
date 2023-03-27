function redrawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    image,
    offsetX,
    offsetY,
    image.width * scaleFactor,
    image.height * scaleFactor
  );
  ctx.fillRect(canvas.width / 2, canvas.height / 2, 5, 5);
  squares.forEach((square) => {
    drawSquare(square);
  });
}

// Initial drawing of squares when the image has loaded
image.onload = () => {
  canvas.height = window.innerHeight;
  scaleFactor = canvas.height / image.height;
  canvas.width = Math.min(image.width * scaleFactor, window.innerWidth);
  ctx.drawImage(image, 0, 0, image.width * scaleFactor, canvas.height);
  squares.forEach((square) => {
    drawSquare(square);
  });
};
