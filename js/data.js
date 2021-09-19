/* exported data */

const $keepImgButton = document.getElementById('keepImg');
const $keepQuoteButton = document.getElementById('keepQuote');

const data = {
  animeSelect: 'random',
  keepImage: 'off',
  keepQuote: 'off'
};

window.addEventListener('load', event => {
  data.keepImage = $keepImgButton.getAttribute('data-toggle');
  data.keepQuote = $keepQuoteButton.getAttribute('data-toggle');
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
);
