export function initModals() {
  const dismissButtons = [];
  const showButtons = [];

  document.querySelectorAll('button[data-show]').forEach((element) => showButtons.push(element));
  document.querySelectorAll('button[data-dismiss]').forEach((element) => dismissButtons.push(element));
  
  dismissButtons.forEach((button) => {
    const form = document.getElementById(button.dataset.dismiss);
    button.addEventListener('click', () => removeShowClass(form));
  });

  showButtons.forEach((button) => {
    const form = document.getElementById(button.dataset.show);
    button.addEventListener('click', () => addShowClass(form));
  })
};

function addShowClass(element) {
  element.classList.add('show');
};

function removeShowClass(element) {
  element.classList.remove('show');
}