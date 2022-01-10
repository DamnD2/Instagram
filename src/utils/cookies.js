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

export function deleteCookie(key) {
  document.cookie = key +'=; Path=/; Expires=Thu, 01 Jan 2000 00:00:01 GMT;';
}