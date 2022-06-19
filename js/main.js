// DOM JS elements//
const $canvasObj = document.getElementById('canvas');
const $randomizeButton = document.querySelector('.randomize-button');
const $animeList = document.getElementById('anime-select');
const $keepImgBtn = document.getElementById('keepImg');
const $keepQuoteBtn = document.getElementById('keepQuote');
const $toggleArea = document.getElementById('toggle-area');
const $loadingArea = document.getElementById('loading');

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
// get window size on load and set variable //
let currWinH = window.innerHeight;
let currWinW = window.innerWidth;
let imgReqH = currWinH;
let imgReqW = currWinW;

// function to calculate request img size//

function reqSize(width) {
  let reqW = 0;
  let reqH = 0;
  if (width < 480) {
    reqW = 300;
    reqH = 300;
  } else if (width >= 480 && width <= 768) {
    reqW = 400;
    reqH = 400;
  } else if (width >= 769 && width <= 1024) {
    reqW = 640;
    reqH = 480;
  } else if (width >= 1025 && width <= 1280) {
    reqW = 640;
    reqH = 480;
  } else if (width > 1280) {
    reqW = 1280;
    reqH = 720;
  }
  return [reqW, reqH];
}

// canvas context API assignment//
const canvasCont = $canvasObj.getContext('2d');

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

// set src to random number for only one update call //

function randomizeImg() {
  const randNum = getRandomIntInclusive(1, 1084);
  imgUpdate(randNum);
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
    $loadingArea.removeAttribute('hidden');
    canvasLoadImg();
    quoteWrap(quoteText, 48);
    $loadingArea.setAttribute('hidden', '');
  }
}

// load or dont load the new image into the randImg.src//
function imgUpdate(id) {
  randImg.src = `https://picsum.photos/id/${id}/${imgReqW}/${imgReqH}?grayscale`;
}

// function to load canvas and draw the quote//
function canvasLoadImg() {
  canvasCont.drawImage(randImg, 0, 0, imgReqW, imgReqH);
}

// function to take the quote and limit the number of char per line//
function quoteWrap(quote, startFont) {
  let useFont = startFont;
  const quoteWords = quote.split(' ');
  let currentLine = '';
  const maxW = (imgReqW - (imgReqW / 10));
  let fillH = (imgReqH * 0.25);
  let lineCount = 0;

  for (let i = 0; i < quoteWords.length; i++) {
    const lineCheck = currentLine + quoteWords[i] + ' '; // add current word plus a space //
    const checkWidth = canvasCont.measureText(lineCheck); // measure the width of the current set of words //
    canvasCont.font = `bold ${useFont}px Roboto`;
    canvasCont.fillStyle = '#FFD700';
    canvasCont.strokeStyle = 'black';
    canvasCont.textAlign = 'center';
    if (checkWidth.width > maxW && i > 0 && lineCount < 4) { // check if the current width has hit boundary to stop adding //
      canvasCont.fillText(currentLine, imgReqW / 2, fillH); // fill with current number of words //
      canvasCont.strokeText(currentLine, imgReqW / 2, fillH);
      currentLine = quoteWords[i] + ' '; // add a space to the end of the line //
      fillH = fillH + (imgReqH / 10); // space the lines of text out//
      lineCount++; // move to the next number of lines if width is not exceeded //
    } else if (lineCount < 4) { // check if at line limit //
      currentLine = lineCheck; // if line hasn't hit boundary, reset it to add another word //
    } else {
      // wipe the old text and try again with a smaller font //
      useFont = (useFont - 2);
      $loadingArea.removeAttribute('hidden');
      canvasLoadImg();
      quoteWrap(quote, useFont);
    }
  }
  if (lineCount !== 4) {
    canvasCont.fillText(currentLine, imgReqW / 2, fillH);
    canvasCont.strokeText(currentLine, imgReqW / 2, fillH);
    loadAttr(quoteAttr, useFont, maxW, fillH);
  }
}

// function to load the attribution separately //

function loadAttr(attr, font, maxWidth, height) {
  canvasCont.font = `bold ${font - 4}px Roboto`; // load in the attribution separately//
  canvasCont.fillText(quoteAttr, imgReqW / 2, height + 75, maxWidth);
  canvasCont.strokeText(quoteAttr, imgReqW / 2, height + 75, maxWidth);
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
  $loadingArea.removeAttribute('hidden');
  canvasLoadImg();
  quoteWrap(quoteText, 48);
  $loadingArea.setAttribute('hidden', '');
});

// event listener for randomizing on button click//
$randomizeButton.addEventListener('click', function () {
  const currentData = localStorage.getItem('javascript-local-storage');
  const currData = JSON.parse(currentData);
  currWinH = window.innerHeight;
  currWinW = window.innerWidth;

  const sizes = reqSize(currWinW);
  imgReqH = sizes[1];
  imgReqW = sizes[0];

  $canvasObj.setAttribute('width', imgReqW);
  $canvasObj.setAttribute('height', imgReqH);

  if (currData.keepQuote === 'off') {
    if ($animeList.value === 'random') {
      getRandomQuote();
    } else {
      getAnimeQuote($animeList.value);
    }
  }
  if (currData.keepImage === 'off') {
    randomizeImg();
  } else if (currData.keepImage === 'on') {
    $loadingArea.removeAttribute('hidden');
    canvasLoadImg();
    quoteWrap(quoteText, 48);
    $loadingArea.setAttribute('hidden', '');
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

// set attribute change for canvas on window size change //
window.addEventListener('resize', event => {
  currWinH = window.innerHeight;
  currWinW = window.innerWidth;

  const sizes = reqSize(currWinW);
  imgReqH = sizes[1];
  imgReqW = sizes[0];

  $canvasObj.setAttribute('width', imgReqW);
  $canvasObj.setAttribute('height', imgReqH);
});
