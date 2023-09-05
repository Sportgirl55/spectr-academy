const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider-small__btn_right");
const btnLeft = document.querySelector(".slider-small__btn_left");
const dotContainer = document.querySelector(".slider__dots");

let curSlide = 0;
const maxSlide = slides.length;

const slider = () => {
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="slider__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    document
      .querySelectorAll(".slider__dot")
      .forEach((dot) => dot.classList.remove("slider__dot_active"));

    document
      .querySelector(`.slider__dot[data-slide="${slide}"]`)
      .classList.add("slider__dot_active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${110 * (i - slide)}%)`)
    );
  };

  const nextSlide = () => {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  // Event handlers

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    e.key === "ArrowLeft" && prevSlide();
  });

  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("slider__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

