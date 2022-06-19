/* exported data */

const $keepImgButton = document.getElementById('keepImg');
const $keepQuoteButton = document.getElementById('keepQuote');
const $currentData = localStorage.getItem('javascript-local-storage');
const $canvas = document.getElementById('canvas');

const data = {
  animeSelect: 'random',
  keepImage: 'off',
  keepQuote: 'off'
};

window.addEventListener('load', event => {
  const currData = JSON.parse($currentData);
  $keepImgButton.setAttribute('data-toggle', currData.keepImage);
  $keepQuoteButton.setAttribute('data-toggle', currData.keepQuote);
  $canvas.setAttribute('height', (window.innerHeight - 400));
  $canvas.setAttribute('width', (window.innerWidth - 400));
});

window.addEventListener('beforeunload', event => {
  data.keepImage = $keepImgButton.getAttribute('data-toggle');
  data.keepQuote = $keepQuoteButton.getAttribute('data-toggle');
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
);
