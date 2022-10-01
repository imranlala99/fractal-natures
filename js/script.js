//script goes here
var myCanvas = document.getElementById("my_canvas");
var ctx = myCanvas.getContext("2d");

function setup() {
    createCanvas(600, 600);
  }
function draw(){
    growTree(400, 600, 120, 0, 10)
}
function growTree(startX, startY, len, angle, branchWidth) {
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    if(len < 10) {
        ctx.restore();
        return;
    }

    draw(0, -len, len*0.8, angle-15, branchWidth*0.8);
    draw(0, -len, len*0.8, angle+15, branchWidth*0.8);

    ctx.restore();
}
