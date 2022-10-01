//script goes here
var myCanvas = document.getElementById("my_canvas");
var ctx = myCanvas.getContext("2d");

// function setup() {
//     createCanvas(600, 600);
//   }
// function draw(){
//     growTree(400, 600, 120, 0, 10)
// }


function growTree(startX, startY, len, angle, branchWidth, color) {
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0,0,0,0.8)";

    if(len < 10) {
        ctx.restore();
        return;
    }

    growTree(0, -len, len*0.8, angle-15, branchWidth*0.8);
    growTree(0, -len, len*0.8, angle+15, branchWidth*0.8);

    ctx.restore();
}


window.addEventListener('load', init);

function init() {
  myCanvas.addEventListener('click', function(event) {
    var xPosition = event.clientX;
    var yPosition = event.clientY;
    var len = Math.random() * 120;
    // var angle = Math.random();
    growTree(xPosition, yPosition, len, 0, 10, getColor());
  })
  window.addEventListener('resize', resizeCanvas, false);
// Draw canvas border for the first time.
  resizeCanvas();
}

function redraw() {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = '5';
  ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
}

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function resizeCanvas() {
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
  redraw();
}

let colors = [
  "#4F000B",
  "#8D918B",
  "#F5FDC6",
  "#C76D7E",
  "#E85D75"
];

function getColor() {
  var index = Math.floor(Math.random() * 5);
  return colors[index];
}
