const modalContainer = document.querySelector(".modal-container");
const guestControls = document.querySelectorAll(".input-number-wrapper");

let unsubscribeModalEvents = [];

const onMinusButton = (evt, input, button) => {
  evt.preventDefault();
  input.value > 0 ? input.value-- : input.value;
  input.value == 0 ? (button.disabled = true) : button.disabled;
};

const onPlusButton = (evt, input, button) => {
  evt.preventDefault();
  input.value++;
  button.disabled = false;
  console.log(input.value);
};

const modalOpen = (evt) => {
  evt.preventDefault();
  modalContainer.classList.remove("modal-container-close");
  guestControls.forEach((e) => {
    const minusButton = e.querySelector(".input-number-button-minus");
    const plusButton = e.querySelector(".input-number-button-plus");
    const guestInput = e.querySelector(".search-form-field-number");
    const increase = () => onPlusButton(evt, guestInput, minusButton);
    const decrease = () => onMinusButton(evt, guestInput, minusButton);

    minusButton.addEventListener("click", decrease);
    plusButton.addEventListener("click", increase);
    unsubscribeModalEvents.push(() => {
      minusButton.removeEventListener("click", decrease);
      plusButton.removeEventListener("click", increase);
    });
  });
};

const modalClose = (evt) => {
  evt.preventDefault();
  modalContainer.classList.add("modal-container-close");
  guestControls.forEach((e) => {
    e.querySelector(".search-form-field-number").value = "";
  });
  unsubscribeModalEvents.forEach((unsubscribe) => unsubscribe());
  unsubscribeModalEvents = [];
  document
    .querySelectorAll(".input-number-button-minus")
    .forEach((button) => (button.disabled = true));
};

document
  .querySelector(".interested-button")
  .addEventListener("click", modalOpen);

document
  .querySelector(".navigation-button")
  .addEventListener("click", modalOpen);

document
  .querySelector(".modal-close-button")
  .addEventListener("click", modalClose);
