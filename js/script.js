//script goes here
var myCanvas = document.getElementById("my_canvas");
var ctx = myCanvas.getContext("2d");



// function setup() {
//     createCanvas(600, 600);
//   }
// function draw(){
//     growTree(400, 600, 120, 0, 10)
// }


function growTree(startX, startY, len, angle, branchWidth) {
    ctx.lineWidth = branchWidth;
    let treesound = new Audio('assets/leaves.m4a');

    ctx.beginPath();
    ctx.save();
    treesound.play();
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

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
    growTree(xPosition, yPosition, len, 0, 10);
  })
}
