const $canvas = document.getElementById('canvas');
const randImg = new Image();
randImg.src = 'images\\grayexp.jpg';
const quoteText = 'Resignation is what kills people. Once theyve rejected resignation, humans gain the privilege of making humanity their footpath.';
const quoteAttr = 'Alucard (Hellsing)';
const canvasCont = $canvas.getContext('2d');

// function to load canvas and draw the quote//
function canvasLoadImg() {
  canvasCont.drawImage(randImg, 0, 0, 1280, 720);
}

// function to take the quote and limit the number of char per line//
function quoteWrap(quote) {
  const quoteWords = quoteText.split(' ');
  let currentLine = '';
  const maxW = 1000;
  let fillH = 720 / 3;

  for (let i = 0; i < quoteWords.length; i++) {
    const lineCheck = currentLine + quoteWords[i] + ' ';
    const checkWidth = canvasCont.measureText(lineCheck);
    canvasCont.font = '4rem Playfair Display';
    canvasCont.fillStyle = '#FFD700';
    canvasCont.strokeStyle = 'black';
    canvasCont.textAlign = 'center';
    if (checkWidth.width > maxW && i > 0) {
      canvasCont.fillText(currentLine, 1280 / 2, fillH);
      canvasCont.strokeText(currentLine, 1280 / 2, fillH);
      currentLine = quoteWords[i] + ' ';
      fillH = fillH + 75;
    } else {
      currentLine = lineCheck;
    }
  }
  canvasCont.fillText(currentLine, 1280 / 2, fillH);
  canvasCont.strokeText(currentLine, 1280 / 2, fillH);
  canvasCont.fillText(quoteAttr, 1280 / 2, fillH + 75);
  canvasCont.strokeText(quoteAttr, 1280 / 2, fillH + 75);
}

randImg.addEventListener('load', function () {
  canvasLoadImg();
  quoteWrap(quoteText);
});
