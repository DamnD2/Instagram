export const router = {
  getUrl () {
    return location.hash.split('/')[0].slice(1);
  },
}
