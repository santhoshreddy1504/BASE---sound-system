class Slider {
    constructor(containerSelector) {
      this.container = document.querySelector(containerSelector);
      this.slides = this.container.querySelectorAll('.slide');
      this.dots = this.container.querySelectorAll('.slider-dot');
      this.leftArrow = this.container.querySelector('.arrow.left');
      this.rightArrow = this.container.querySelector('.arrow.right');
      this.currentIndex = 0;
      this.isDragging = false;
      this.startPos = 0;
      this.currentTranslate = 0;
      this.prevTranslate = 0;
      this.autoSlideInterval = null;
  
      this.init();
    }
  
    init() {
      this.bindEvents();
      this.startAutoSlide();
      this.updateSlider();
    }
  
    bindEvents() {
      this.leftArrow.addEventListener('click', () => this.prevSlide());
      this.rightArrow.addEventListener('click', () => this.nextSlide());
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });
  
      // Touch events
      this.container.addEventListener('touchstart', (e) => this.touchStart(e));
      this.container.addEventListener('touchmove', (e) => this.touchMove(e));
      this.container.addEventListener('touchend', () => this.touchEnd());
    }
  
    updateSlider() {
      this.slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentIndex);
      });
      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
      this.container.querySelector('.slider').style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
  
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateSlider();
      this.resetAutoSlide();
    }
  
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.updateSlider();
      this.resetAutoSlide();
    }
  
    goToSlide(index) {
      this.currentIndex = index;
      this.updateSlider();
      this.resetAutoSlide();
    }
  
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }
  
    resetAutoSlide() {
      clearInterval(this.autoSlideInterval);
      this.startAutoSlide();
    }
  
    touchStart(e) {
      this.isDragging = true;
      this.startPos = e.touches[0].clientX;
      this.currentTranslate = this.prevTranslate;
      clearInterval(this.autoSlideInterval);
    }
  
    touchMove(e) {
      if (this.isDragging) {
        const currentPosition = e.touches[0].clientX;
        this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
        this.container.querySelector('.slider').style.transform = `translateX(${this.currentTranslate}px)`;
      }
    }
  
    touchEnd() {
      this.isDragging = false;
      const movedBy = this.currentTranslate - this.prevTranslate;
  
      if (movedBy < -100) this.nextSlide();
      if (movedBy > 100) this.prevSlide();
  
      this.prevTranslate = -this.currentIndex * this.container.offsetWidth;
      this.updateSlider();
      this.startAutoSlide();
    }
  }
  
  // Initialize first slider
  const slider = new Slider('.slider-container');
  
  // Second image slider functionality
  let currentImageSlide = 0;
  const imageSlides = document.querySelectorAll('.image-slide');
  const imageDots = document.querySelectorAll('.image-slider-container .slider-dot');
  
  function updateImageSlider() {
    imageSlides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentImageSlide);
    });
    imageDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentImageSlide);
    });
  }
  
  function nextImageSlide() {
    currentImageSlide = (currentImageSlide + 1) % imageSlides.length;
    updateImageSlider();
  }
  
  function prevImageSlide() {
    currentImageSlide = (currentImageSlide - 1 + imageSlides.length) % imageSlides.length;
    updateImageSlider();
  }
  
  function goToImageSlide(index) {
    currentImageSlide = index;
    updateImageSlider();
  }
  
  // Auto-advance image slider
  setInterval(nextImageSlide, 6000);