let carouselIndex = 0;
const screenshotImages = document.querySelectorAll(".screenshots img");

function carousel() {
  for (let i = 0; i < screenshotImages.length; i++) {
    screenshotImages[i].style.display = "none";
  }
  carouselIndex++;
  if (carouselIndex > screenshotImages.length) {
    carouselIndex = 1;
  }
  screenshotImages[carouselIndex - 1].style.display = "block";
}

let images = document.getElementById("images");
images.addEventListener("click", function() {
  carousel();
});

carousel();
