/* exported data */

const data = {
  animeSelect: 'random',
  keepImage: true
};

window.addEventListener('load', event => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
);
