/* exported data */

const $keepImgButton = document.getElementById('keepImg');
const $keepQuoteButton = document.getElementById('keepQuote');
const $currentData = localStorage.getItem('javascript-local-storage');

const data = {
  animeSelect: 'random',
  keepImage: 'off',
  keepQuote: 'off'
};

window.addEventListener('load', event => {
  const currData = JSON.parse($currentData);
  $keepImgButton.setAttribute('data-toggle', currData.keepImage);
  $keepQuoteButton.setAttribute('data-toggle', currData.keepQuote);
});

window.addEventListener('beforeunload', event => {
  data.keepImage = $keepImgButton.getAttribute('data-toggle');
  data.keepQuote = $keepQuoteButton.getAttribute('data-toggle');
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
);
