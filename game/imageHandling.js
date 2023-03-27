const image = new Image();
image.src = "../images/background.jpg";
let scaleFactor;

image.onload = () => {
  canvas.height = window.innerHeight;
  scaleFactor = canvas.height / image.height;
  canvas.width = Math.min(image.width * scaleFactor, window.innerWidth);
  ctx.drawImage(image, 0, 0, image.width * scaleFactor, canvas.height);
};
