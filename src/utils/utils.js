export const setHash = (hash) => location.hash = hash;

export const clearInputs = (...inputs) => inputs.forEach((input) => input.value = '');

export const redirectToMainPage = () => setHash('#main');
export const redirectToSignIn = () => setHash('#signin');

export const setUrlParams = (param) => {
  const newUrl = `${location.origin}/${param}${location.hash}`
  history.pushState(null, null, newUrl);
}

export const addClassToRouterRoot = (className) => {
  document.querySelector('router-root').classList.add(className);
}

export const removeClassToRouterRoot = (className) => {
  document.querySelector('router-root').classList.remove(className);
}

export const openSnackBar = (message) => {
  snackbar.innerHTML = message;
  snackbar.classList.add('show');
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}

export const openModal = (modal) => {
  modal.classList.add('show');
  setTimeout(() => { modal.classList.remove('hidden') })
  setTimeout(() => { modal.classList.add('open') },300);
}

export const closeModal = (modal) => {
  modal.classList.add('hidden');
  modal.classList.remove('open');
  setTimeout(() => modal.classList.remove('show'), 300);
}