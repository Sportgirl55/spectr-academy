let intervals = {
  black: {
    interval: null,
    direction: true,
  },
  white: {
    interval: null,
    direction: true,
  },
};

let speed = 12;

const checkColor = (box) =>
  box.classList.contains("_black") ? "black" : "white";

document.querySelector("body").addEventListener("click", (e) => {
  const checkContains = (word) => e.target.classList.contains(word);
  const box = e.target.parentElement.previousElementSibling;
  if (
    !box ||
    (checkContains("start") && box.textContent !== "Стою") ||
    (checkContains("stop") && box.textContent !== "Бегу")
  )
    return;

  if (checkContains("start")) {
    startAnimate(box);
  } else if (checkContains("stop")) {
    stopAnimate(box);
  }
});

// Изменение скорости анимации

document.querySelector(".speed").addEventListener("change", (e) => {
  const activeBoxes = [...document.getElementsByClassName("box")].filter(
    (el) => el.innerText === "Бегу"
  );
  Object.keys(intervals).forEach((color) =>
    clearInterval(intervals[color].interval)
  );

  speed = e.target.value;
  activeBoxes.map(startAnimate);
});

function startAnimate(box) {
  box.textContent = "Бегу";
  const container = box.parentElement;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  const coefficient =
    (containerWidth - box.offsetWidth) / (containerHeight - box.offsetWidth);
  let { direction } = intervals[checkColor(box)];
  let stepX = 0;
  let stepY = 0;

  const moveElement = () => {
    stepX = direction ? stepX + 1 * coefficient : stepX - 1 * coefficient;
    stepY = direction ? stepY + 1 : stepY - 1;

    if (stepX >= containerWidth - box.offsetWidth || stepY >= containerHeight) {
      direction = false;
    }

    if (stepX <= 0 || stepY <= 0) {
      direction = true;
    }

    box.style.transform = `translate(${stepX}px, ${stepY}px)`;
  };
  intervals[checkColor(box)].interval = setInterval(moveElement, speed);
  resizeObserver.observe(document.querySelector(".wrapper"));
}

function stopAnimate(box) {
  box.textContent = "Стою";
  const interval = intervals[checkColor(box)].interval;
  clearInterval(interval);
}

// Перезапуск анимации при изменении ширины окна

const resizeObserver = new ResizeObserver(() => {
  const activeBoxes = Array.from(document.querySelectorAll(".box")).filter(
    (el) => el.innerText === "Бегу"
  );
  if (activeBoxes.length === 0) return;
  activeBoxes.forEach((box) => {
    stopAnimate(box);
    startAnimate(box);
  });
});
