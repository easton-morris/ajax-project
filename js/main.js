// DOM JS elements//
const $canvas = document.getElementById('canvas');
const $randomizeButton = document.querySelector('.randomize-button');
const $animeList = document.getElementById('anime-select');
const $keepImgBtn = document.getElementById('keepImg');
const $keepQuoteBtn = document.getElementById('keepQuote');
const $toggleArea = document.getElementById('toggle-area');

// random image and quote variables//
const randImg = new Image();
randImg.src = 'images\\grayexp.jpg';
randImg.alt = 'Grayscale Image of Random Thing';
let quoteText = 'Resignation is what kills people. Once they\'ve rejected resignation, humans gain the privilege of making humanity their footpath.';
let quoteAttr = 'Alucard (Hellsing)';

// get localStorage data//
let currentData = localStorage.getItem('javascript-local-storage');
if (currentData !== null) {
  currentData = JSON.parse(currentData);
}
// get screen size on load and set variable //

// canvas context API assignment//
const canvasCont = $canvas.getContext('2d');

// XHR for a random quote text//
function getRandomQuote() {
  const quoteReq = new XMLHttpRequest();
  quoteReq.open('GET', 'https://animechan.vercel.app/api/random');
  quoteReq.responseType = 'json';
  quoteReq.addEventListener('load', function () {
    quoteUpdate(this.response.quote, this.response.character, this.response.anime);
  });
  quoteReq.send();
}

// random integer for the anime//
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// XHR for a random quote from a specific anime//
function getAnimeQuote(anime) {
  const quoteReq = new XMLHttpRequest();
  const randNum = getRandomIntInclusive(0, 9);
  quoteReq.open('GET', `https://animechan.vercel.app/api/quotes/anime?title=${anime}&page=${randNum}`);
  quoteReq.responseType = 'json';
  quoteReq.addEventListener('load', function () {
    if (this.response[randNum] !== undefined) {
      quoteUpdate(this.response[randNum].quote, this.response[randNum].character, this.response[randNum].anime);
    } else {
      quoteUpdate(this.response[0].quote, this.response[0].character, this.response[0].anime);

    }
  });
  quoteReq.send();
}

// XHR for a random picture//
function getRandomImg() {
  const imgReq = new XMLHttpRequest();
  imgReq.open('GET', 'https://picsum.photos/1280/720?grayscale');
  imgReq.responseType = 'json';
  imgReq.addEventListener('load', function () {
    imgUpdate();
  });
  imgReq.send();
}

// XHR and creation of anime list//
function getAnimeList() {
  const listReq = new XMLHttpRequest();
  listReq.open('GET', 'https://animechan.vercel.app/api/available/anime');
  listReq.responseType = 'json';
  listReq.addEventListener('load', function () {
    loadOptions(this.response);
  });
  listReq.send();
}

// load the new quote into the quoteText variable and update the canvas if//
//    the toggles are only changing the quote //
function quoteUpdate(quote, character, anime) {
  const currentData = localStorage.getItem('javascript-local-storage');
  const currData = JSON.parse(currentData);
  quoteText = quote;
  quoteAttr = character + ' (' + anime + ')';
  if (currData.keepQuote === 'off' && currData.keepImage === 'on') {
    canvasLoadImg();
    quoteWrap(quoteText, 3);
  }
}

// load or dont load the new image into the randImg.src//
function imgUpdate() {
  randImg.src = 'https://picsum.photos/1280/720?grayscale';
}

// function to load canvas and draw the quote//
function canvasLoadImg() {
  canvasCont.drawImage(randImg, 0, 0, 1280, 720);
}

// function to take the quote and limit the number of char per line//
function quoteWrap(quote, startFont) {
  const quoteWords = quoteText.split(' ');
  let currentLine = '';
  const maxW = 1000;
  let fillH = 200;
  let lineCount = 0;

  for (let i = 0; i < quoteWords.length; i++) {
    const lineCheck = currentLine + quoteWords[i] + ' ';
    const checkWidth = canvasCont.measureText(lineCheck);
    canvasCont.font = `bold ${startFont}rem Roboto`;
    canvasCont.fillStyle = '#FFD700';
    canvasCont.strokeStyle = 'black';
    canvasCont.textAlign = 'center';
    if (checkWidth.width > maxW && i > 0 && lineCount < 6) {
      canvasCont.fillText(currentLine, 1280 / 2, fillH);
      canvasCont.strokeText(currentLine, 1280 / 2, fillH);
      currentLine = quoteWords[i] + ' ';
      fillH = fillH + 75; // space the lines of text out//
      lineCount++;
    } else if (lineCount < 6) {
      currentLine = lineCheck;
    } else {
      // wipe the old text and try again with a smaller font //
      canvasLoadImg();
      quoteWrap(quote, (startFont - 1));
    }
  }
  canvasCont.fillText(currentLine, 1280 / 2, fillH);
  canvasCont.strokeText(currentLine, 1280 / 2, fillH);
  canvasCont.font = `bold ${startFont - 1}rem Roboto`; // load in the attribution separately//
  canvasCont.fillText(quoteAttr, 1280 / 2, fillH + 75);
  canvasCont.strokeText(quoteAttr, 1280 / 2, fillH + 75);
}

// function to create dropdown options//
function loadOptions(animeArray) {
  for (let ii = 0; ii < animeArray.length; ii++) {
    const newOp = document.createElement('option');
    newOp.setAttribute('value', animeArray[ii]);
    newOp.textContent = animeArray[ii];
    $animeList.appendChild(newOp);
  }
}

// event listener to load the page items//
window.addEventListener('load', () => {
  getAnimeList();
});

// populate new image and text once the image is ready//
randImg.addEventListener('load', function () {
  canvasLoadImg();
  quoteWrap(quoteText, 3);
});

// event listener for randomizing on button click//
$randomizeButton.addEventListener('click', function () {
  const currentData = localStorage.getItem('javascript-local-storage');
  const currData = JSON.parse(currentData);

  if (currData.keepQuote === 'off') {
    if ($animeList.value === 'random') {
      getRandomQuote();
    } else {
      getAnimeQuote($animeList.value);
    }
  }
  if (currData.keepImage === 'off') {
    getRandomImg();
  }
});

// function for toggling the data-toggle attr of the button //
function dataToggle(event) {
  const buttonTarget = event.target;
  const currentSetting = buttonTarget.getAttribute('data-toggle');

  if (currentSetting === 'off' || currentSetting === '') {
    buttonTarget.setAttribute('data-toggle', 'on');
  } else if (currentSetting === 'on') {
    buttonTarget.setAttribute('data-toggle', 'off');
  }
}

// listener to update the attributes of the keepImg btn on click //
$keepImgBtn.addEventListener('click', event => {
  dataToggle(event);
});

// listener to update the attributes of the keepQuote btn on click //
$keepQuoteBtn.addEventListener('click', event => {
  dataToggle(event);
});

// function to update the localStorage with new button info on click //
function updateToggles() {
  const currentData = JSON.parse(localStorage.getItem('javascript-local-storage'));
  const newData = {
    animeSelect: currentData.animeSelect,
    keepImage: $keepImgBtn.getAttribute('data-toggle'),
    keepQuote: $keepQuoteBtn.getAttribute('data-toggle')
  };

  localStorage.setItem('javascript-local-storage', JSON.stringify(newData));
}

// add a listener to toggle area buttons update the toggles on click //
$toggleArea.addEventListener('click', event => {
  updateToggles();
}
);
