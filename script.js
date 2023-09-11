import { formatTime, getRandomDateWithinMonth } from "./utils.js";

// Slider

const slider = (slides, dotContainer = null, slider) => {
  if (!slides || !slider) return;
  let curSlide = 0;

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="slider__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    Array.from(dotContainer.children).forEach((dot) => {
      dot.classList.toggle("slider__dot_active", dot.dataset.slide == slide);
    });
  };

  const goToSlide = (slide) => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${110 * (i - slide)}%)`;
    });
  };

  const nextSlide = () => {
    curSlide = (curSlide + 1) % slides.length;
    goToSlide(curSlide);
    dotContainer && activateDot(curSlide);
  };

  const prevSlide = () => {
    curSlide = (curSlide - 1 + slides.length) % slides.length;
    goToSlide(curSlide);
    dotContainer && activateDot(curSlide);
  };

  const swipeSlider = () => {
    let initialX;
    let initialY;

    slider.addEventListener("touchstart", (event) => {
      initialX = event.touches[0].clientX;
      initialY = event.touches[0].clientY;
    });

    slider.addEventListener("touchmove", (event) => {
      if (!initialX || !initialY) return;

      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;
      const diffX = initialX - currentX;
      const diffY = initialY - currentY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        diffX > 0 ? nextSlide() : prevSlide();
      }

      initialX = null;
      initialY = null;
    });
  };

  goToSlide(0);
  swipeSlider();
  if (dotContainer) {
    createDots();
    activateDot(0);
  }

  const sliderBtns =
    slider.previousElementSibling?.querySelector(".slider__btns");

  if (sliderBtns) {
    const btnRight = sliderBtns.querySelector(".slider__btn_right");
    const btnLeft = sliderBtns.querySelector(".slider__btn_left");
    btnRight && btnRight.addEventListener("click", nextSlide);
    btnLeft && btnLeft.addEventListener("click", prevSlide);
  }

  if (slider.classList.contains("main-slider")) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    });
  }

  dotContainer &&
    dotContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("slider__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
};

const mainSlider = document.querySelector(".main-slider");
const mainSlides = mainSlider.querySelectorAll(".main-slide");
const mainDotContainer = mainSlider.querySelector(".slider__dots");
slider(mainSlides, mainDotContainer, mainSlider);

const productsSlider = document.querySelector(".products-slider");
const productSlides = productsSlider.querySelectorAll(".products-slide");
const dotContainer = productsSlider.querySelector(".slider__dots");
slider(productSlides, dotContainer, productsSlider);

const promotionsSlider = document.querySelector(".promotions");
const promotionsSlides = promotionsSlider.querySelectorAll(".promotions-slide");
const promotionsDotContainer = promotionsSlider.querySelector(".slider__dots");
slider(promotionsSlides, promotionsDotContainer, promotionsSlider);

const smallSlider = document.querySelector(".small-slider");
const smallSliderSlides = smallSlider.querySelectorAll(".small-slider__slide");
slider(smallSliderSlides, null, smallSlider);

// Timers

function countdown(elem) {
  let endDate = new Date(getRandomDateWithinMonth()).getTime();
  if (isNaN(endDate)) return;
  const timer = setInterval(calculate, 1000);

  function calculate() {
    let timeRemaining = Math.max(0, endDate - Date.now()) / 1000;

    if (timeRemaining <= 0) {
      elem.insertAdjacentHTML(
        "afterBegin",
        `<span class="over-text">Promotion is over</span>`
      );
      clearInterval(timer);
      return;
    }

    const days = Math.floor(timeRemaining / 86400);
    const hours = Math.floor((timeRemaining % 86400) / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = Math.floor(timeRemaining % 60);

    elem.querySelector(".days").textContent = formatTime(days);
    elem.querySelector(".hours").textContent = formatTime(hours);
    elem.querySelector(".minutes").textContent = formatTime(minutes);
    elem.querySelector(".seconds").textContent = formatTime(seconds);
  }
}

// Включение таймеров на каждой карточке

const enableTimers = () => {
  const elem = document.querySelector(".promotions");
  const slides = Array.from(elem.querySelectorAll('[class*="slide_"]'));
  slides.forEach(countdown);
};

enableTimers();
