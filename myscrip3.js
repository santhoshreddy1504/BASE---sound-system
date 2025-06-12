let mainSlideIndex = 0;
const mainSlides = document.querySelectorAll('.main-slider .slide');
const mainSlider = document.getElementById('mainSlider');

function showMainSlide(index) {
  if (index >= mainSlides.length) mainSlideIndex = 0;
  if (index < 0) mainSlideIndex = mainSlides.length - 1;
  
  mainSlider.style.transform = `translateX(-${mainSlideIndex * 100}%)`;
}

function nextMainSlide() {
  mainSlideIndex++;
  showMainSlide(mainSlideIndex);
}

function prevMainSlide() {
  mainSlideIndex--;
  showMainSlide(mainSlideIndex);
}

// Auto-advance main slider
setInterval(nextMainSlide, 5000);

// Products Slider Functionality
let productsPosition = 0;
const productsSlider = document.getElementById('productsSlider');
const productCards = document.querySelectorAll('.product-card');
let cardWidth = productCards[0].offsetWidth + 32; // including gap

function updateProductsSlider() {
  productsSlider.style.transform = `translateX(-${productsPosition * cardWidth}px)`;
}

function nextProductsSlide() {
  const maxPosition = productCards.length - (window.innerWidth > 1024 ? 2 : 1);
  productsPosition = Math.min(productsPosition + 1, maxPosition);
  updateProductsSlider();
}

function prevProductsSlide() {
  productsPosition = Math.max(productsPosition - 1, 0);
  updateProductsSlider();
}

// Responsive adjustments
function handleResize() {
  cardWidth = productCards[0].offsetWidth + 32;
  updateProductsSlider();
}

window.addEventListener('resize', handleResize);

// Initialize
showMainSlide(0);
updateProductsSlider();
