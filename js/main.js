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

// 40 characters across max//
// function to take the quote and limit the number of char per line//
function quoteSplit(quote) {
  const quoteL = quote.length;
  if (quoteL > 38) {
    quote.split();
  }
}

// function to load canvas and draw the quote//
function canvasLoad() {
  $canvas = $canvas.getContext('2d');
  $canvas.drawImage(randImg, 0, 0, canvasW, canvasH);
  $canvas.font = '4rem Playfair Display';
  $canvas.fillStyle = '#FFD700';
  $canvas.textAlign = 'center';
  $canvas.fillText(quoteText, canvasW / 2, canvasH / 2);
}

document.onload = quoteSplit(quoteText);
randImg.onload = canvasLoad();
