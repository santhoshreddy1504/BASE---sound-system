

  let currentIndex = 0;

  function updateSlider() {
    const slider = document.getElementById('slider');
    const cards = document.querySelectorAll('.card');
    const visibleCards = window.innerWidth >= 768 ? 2 : 1;
    const cardWidth = cards[0].offsetWidth + 32; // 32px = margin left + right
    const maxIndex = cards.length - visibleCards;

    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function slideLeft() {
    currentIndex--;
    updateSlider();
  }

  function slideRight() {
    currentIndex++;
    updateSlider();
  }

  window.addEventListener('resize', updateSlider);
  window.addEventListener('DOMContentLoaded', updateSlider);

