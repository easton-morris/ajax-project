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

function canvasLoad() {
  $canvas = $canvas.getContext('2d');
  $canvas.drawImage(randImg, 0, 0, canvasW, canvasH);
  $canvas.font = '4rem Playfair Display';
  $canvas.fillStyle = '#FFD700';
  $canvas.textAlign = 'center';
  $canvas.fillText(quoteText, canvasW / 2, canvasH / 2);
}

randImg.onload = canvasLoad();
