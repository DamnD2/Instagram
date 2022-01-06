export const setCookie = (key, value) => {
  document.cookie = `${key}=${value}`;
};

export const getCookieValue = (key) => {
  const { cookie } = document;
  const result = cookie.split('; ').filter((element) => element.includes(key));

  return result.length
    ? result.toString().split('=')[1]
    : false;
};