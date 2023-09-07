const slider = (slides, dotContainer, slider) => {
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
    dotContainer.querySelectorAll(".slider__dot").forEach((dot) => {
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
    activateDot(curSlide);
  };

  const prevSlide = () => {
    curSlide = (curSlide - 1 + slides.length) % slides.length;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const swipeSlider = () => {
    let initialX;
    let initialY;

    slider.addEventListener("touchstart", (event) => {
      initialX = event.touches[0].clientX;
      initialY = event.touches[0].clientY;
    });

    slider.addEventListener("touchmove", (event) => {
      if (!initialX || !initialY) {
        return;
      }

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

  const initBannerSlider = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
    swipeSlider();
  };

  initBannerSlider();

  const sliderSmallBtns = slider.previousElementSibling?.querySelector(
    ".slider-small__btns"
  );
  if (sliderSmallBtns) {
    const btnRight = sliderSmallBtns.querySelector(".slider-small__btn_right");
    const btnLeft = sliderSmallBtns.querySelector(".slider-small__btn_left");
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

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
