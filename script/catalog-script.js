const MAX_INPUT_VALUE = 10000;
const scaleBar = document.querySelector(".range-scale");
const rangeBar = document.querySelector(".range-bar");
const minInput = document.querySelector(".range-input-left");
const maxInput = document.querySelector(".range-input-right");
const minRangeButton = document.querySelector(".toggle-min");
const maxRangeButton = document.querySelector(".toggle-max");
const resetButton = document.querySelector(".catalog-filter-reset");
const buttonWidth = minRangeButton.offsetWidth;
const scaleBarWidth = scaleBar.offsetWidth;
const rangeBarWidth = rangeBar.offsetWidth;
minInput.value = 0;
maxInput.value = 9000;

resetButton.addEventListener("click", () => {
  minRangeButton.style.left = "0px";
  maxRangeButton.style.left = "242px";
  rangeBar.style.width = "242px";
  rangeBar.style.left = "0px";
});

minRangeButton.addEventListener("mousedown", (e) => {
  const initMinButtonX =
    minRangeButton.getBoundingClientRect().left -
    scaleBar.getBoundingClientRect().left;
  const initMaxButtonX =
    maxRangeButton.getBoundingClientRect().left -
    scaleBar.getBoundingClientRect().left;
  let initCursorX = e.screenX;

  const handleMouseMove = (evt) => {
    const diffCursorX = evt.screenX - initCursorX;
    let newX = initMinButtonX + diffCursorX;
    if (newX < 0) {
      newX = 0;
    } else if (newX > initMaxButtonX - buttonWidth) {
      newX = initMaxButtonX - buttonWidth;
    }
    e.target.style.left = newX + "px";
    rangeBar.style.width = initMaxButtonX - newX + "px";
    rangeBar.style.left = newX + "px";
    minInput.value = Math.round(
      (newX / scaleBar.offsetWidth) * MAX_INPUT_VALUE
    );
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
});

maxRangeButton.addEventListener("mousedown", (e) => {
  const getInitMinButtonX =
    minRangeButton.getBoundingClientRect().left -
    scaleBar.getBoundingClientRect().left;
  const getInitMaxButtonX =
    maxRangeButton.getBoundingClientRect().left -
    scaleBar.getBoundingClientRect().left;
  let initCursorX = e.screenX;

  const handleMouseMove = (evt) => {
    const diffCursorX = evt.screenX - initCursorX;
    let newX = getInitMaxButtonX + diffCursorX;

    if (newX < getInitMinButtonX + buttonWidth) {
      newX = getInitMinButtonX + buttonWidth;
    } else if (newX > scaleBarWidth - buttonWidth) {
      newX = scaleBarWidth - buttonWidth;
    }
    e.target.style.left = newX + "px";
    rangeBar.style.width = newX - getInitMinButtonX + "px";
    maxInput.value = Math.round(
      (newX / (scaleBar.offsetWidth - minRangeButton.offsetWidth)) *
        MAX_INPUT_VALUE
    );
  };

  const handleMouseUp = (e) => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
});

const gridTogglers = document.querySelectorAll(".catalog-grid-toggler");
gridTogglers.forEach((gridToggler) =>
  gridToggler.addEventListener("click", () => {
    const currentGrid = document.querySelector(
      ".catalog-grid-toggler-selected"
    );
    currentGrid.classList.remove("catalog-grid-toggler-selected");
    gridToggler.classList.add("catalog-grid-toggler-selected");
  })
);
