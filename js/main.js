// DOM JS elements//
const $canvas = document.getElementById('canvas');
const $randomizeButton = document.querySelector('.randomize-button');

// random image and quote variables//
const randImg = new Image();
randImg.src = 'images\\grayexp.jpg';
randImg.alt = 'Grayscale Image of Random Thing';
let quoteText = 'Resignation is what kills people. Once theyve rejected resignation, humans gain the privilege of making humanity their footpath.';
let quoteAttr = 'Alucard (Hellsing)';

// canvas context API//
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

// load or dont load the new quote into the quoteText variable//
function quoteUpdate(quote, character, anime) {
  quoteText = quote;
  quoteAttr = character + ' (' + anime + ')';
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
function quoteWrap(quote) {
  const quoteWords = quoteText.split(' ');
  let currentLine = '';
  const maxW = 1000;
  let fillH = 200;

  for (let i = 0; i < quoteWords.length; i++) {
    const lineCheck = currentLine + quoteWords[i] + ' ';
    const checkWidth = canvasCont.measureText(lineCheck);
    canvasCont.font = 'bold 3rem Roboto';
    canvasCont.fillStyle = '#FFD700';
    canvasCont.strokeStyle = 'black';
    canvasCont.textAlign = 'center';
    if (checkWidth.width > maxW && i > 0) {
      canvasCont.fillText(currentLine, 1280 / 2, fillH);
      canvasCont.strokeText(currentLine, 1280 / 2, fillH);
      currentLine = quoteWords[i] + ' ';
      fillH = fillH + 75; // space the lines of text out//
    } else {
      currentLine = lineCheck;
    }
  }
  canvasCont.fillText(currentLine, 1280 / 2, fillH);
  canvasCont.strokeText(currentLine, 1280 / 2, fillH);
  canvasCont.font = 'bold 2rem Roboto';
  canvasCont.fillText(quoteAttr, 1280 / 2, fillH + 75); // load in the attribution separately//
  canvasCont.strokeText(quoteAttr, 1280 / 2, fillH + 75);
}

// populate new image and text once the image is ready//
randImg.addEventListener('load', function () {
  canvasLoadImg();
  quoteWrap(quoteText);
});

// event listener for randomizing on button click//
$randomizeButton.addEventListener('click', function () {
  getRandomQuote();
  getRandomImg();
});
