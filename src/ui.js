export const modifyFox = (state) => {
  document.querySelector(".fox").className = `fox fox-${state}`;
};

export const modifyScene = (state) => {
  document.querySelector(".game").className = `game ${state}`;
};

export const togglePoopBag = (show) => {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};

export const writeModal = (text = "") => {
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
};
