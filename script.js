import { formatTime, getRandomDate } from "./utils.js";

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

  // Если есть кнопки переключения слайдов

  // const sliderBtns =
  //   slider.previousElementSibling?.querySelector(".slider__btns");

  // if (sliderBtns) {
  //   const btnRight = sliderBtns.querySelector(".slider__btn_right");
  //   const btnLeft = sliderBtns.querySelector(".slider__btn_left");
  //   btnRight && btnRight.addEventListener("click", nextSlide);
  //   btnLeft && btnLeft.addEventListener("click", prevSlide);
  // }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

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

// Timers

function countdown(elem) {
  let endDate = new Date(getRandomDate()).getTime();
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

//Swiper

const swiperPromotions = new Swiper(".promotions", {
  loop: true,
  pagination: {
    el: ".promotions .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#promotions .slider__btn_right",
    prevEl: "#promotions .slider__btn_left",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  slidesPerView: 2,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

const swiperDaily = new Swiper(".products-slider", {
  loop: false,
  pagination: {
    el: ".products-slider .swiper-pagination",
    clickable: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  navigation: {
    nextEl: "#daily .slider__btn_right",
    prevEl: "#daily .slider__btn_left",
  },
  slidesPerView: 4,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 8,
    },
    1050: {
      slidesPerView: 4,
      spaceBetween: 8,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

const swiperSmall = new Swiper("#small-slider .swiper", {
  loop: true,
  navigation: {
    nextEl: "#small-slider .slider__btn_right",
    prevEl: "#small-slider .slider__btn_left",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  slidesPerView: 8,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    480: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 8,
      spaceBetween: 30,
    },
  },
});
