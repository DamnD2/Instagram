export const setHash = (hash) => location.hash = hash;

export const clearInputs = (...inputs) => inputs.forEach((input) => input.value = '');

export const redirectToMainPage = () => setHash('#main');

export const setUrlParams = (param) => {
  const newUrl = `${location.origin}/${param}${location.hash}`
  history.pushState(null, null, newUrl);
}
