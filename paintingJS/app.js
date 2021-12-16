const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');

const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const clear = document.getElementById('jsClear');

const INITAL_COLOR  = "#2c2c2c"
const CANVAS_SIZE = 700

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITAL_COLOR
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}
function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y); 
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(e) {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color; 
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const size = e.target.value;
  ctx.lineWidth = size
}

function handleModeClick() {
  if(filling === true){
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
  }
}

function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(e) {
  e.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[🎨]'
  link.click();
}

function handleClearClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// canvas mouse event
if(canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click',  handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

// color Change
Array.from(colors).forEach(color => 
  color.addEventListener('click', handleColorClick)
);

// brush range
if(range) {
  range.addEventListener('input', handleRangeChange);
}

if(mode) {
  mode.addEventListener('click', handleModeClick);
}

if(save) {
  save.addEventListener('click', handleSaveClick);
}

if(clear) {
  clear.addEventListener('click', handleClearClick);
}