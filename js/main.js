let $canvas = document.getElementById('canvas');
const randImg = new Image();
randImg.src = 'images\\grayexp.jpg';
const imgH = randImg.height;
const imgW = randImg.width;
$canvas.setAttribute('height', imgH);
$canvas.setAttribute('width', imgW);
const quoteText = 'Resignation is what kills people. Once theyve rejected resignation, humans gain the privilege of making humanity their footpath. Alucard (Hellsing)';
const canvasW = $canvas.width;
const canvasH = $canvas.height;
const canvasCont = $canvas.getContext('2d');

// function to load canvas and draw the quote//
function canvasLoadImg() {
  $canvas = $canvas.getContext('2d');
  $canvas.drawImage(randImg, 0, 0, canvasW, canvasH);
}

// function to take the quote and limit the number of char per line//
function quoteWrap(quote) {
  const quoteWords = quoteText.split(' ');
  let currentLine = '';
  const maxW = canvasW - 200;
  let fillH = 40;

  for (let i = 0; i < quoteWords.length; i++) {
    const lineCheck = currentLine + quoteWords[i] + ' ';
    const checkWidth = canvasCont.measureText(lineCheck);
    if (checkWidth > maxW && i > 0) {
      canvasCont.font = '4rem Playfair Display';
      canvasCont.fillStyle = '#FFD700';
      canvasCont.textAlign = 'center';
      canvasCont.fillText(currentLine, canvasW / 2, fillH);
      fillH = fillH + 20;
    } else {
      currentLine = lineCheck;
    }
  }
  canvasCont.font = '3rem Playfair Display';
  canvasCont.fillStyle = '#FFD700';
  canvasCont.textAlign = 'center';
  canvasCont.fillText(currentLine, canvasW / 2, fillH);
}

randImg.onload = canvasLoadImg();
quoteWrap(quoteText);
