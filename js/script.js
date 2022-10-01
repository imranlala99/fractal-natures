//script goes here
var myCanvas = document.getElementById("my_canvas");
var ctx = myCanvas.getContext("2d");
// let animFrame;


// function setup() {
//     createCanvas(600, 600);
//   }
// function draw(){
//     growTree(400, 600, 120, 0, 10)
// }

//adding new
function init() {
    // myCanvas.width = window.innerWidth;
    // myCanvas.height = window.innerHeight;
    // ctx.strokeStyle = '#532';
    cancelAnimationFrame(animFrame);
    // ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

    // branches.splice(0, branches.length);
    // leaves.splice(0, leaves.length);
    // currentHue = hues[hueIndex++ % hues.length];
    // drawLeaves = document.querySelector('#leaves').checked;
    // branches.push(new Branch(0, 0, trunkHeight, 0, 0.03, 20));
    // Couple of extra trees, enable if you wish
    // branches.push(new Branch(-400, 0, 160 + Math.random() * 40, 0, 0.01 + Math.random() / 30, 20));
    // branches.push(new Branch(400, 0, 160 + Math.random() * 40, 0, 0.01 + Math.random() / 30, 20));
    
    window.requestAnimationFrame(growTree(400, 600, 60, 0, 10));

}

init();

// function loop() {
//   ctx.save();
//   ctx.translate(-10 + canvas.width / 2, canvas.height);
  
//   branches.forEach((b, i) => {
//     if (!b.done) {
//       b.draw();
//       b.update();
//     } else {
//       branches.splice(i, 1);
//     }
//   });
//   leaves.forEach((l, i) => {
//     if (l.scale < l.maxScale) {
//       l.draw();
//       l.update();
//     } else {
//       leaves.splice(i, 1);
//     }
//   });
//   ctx.restore();
  
//   // Request animation frame only if there is something to animate
//   if (leaves.length || branches.length) {
//     animFrame = requestAnimationFrame(loop);
//   }
// }


function growTree(startX, startY, len, angle, branchWidth) {
    // ctx.save();
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();
    ctx.save();

    if(len < 10) {
        ctx.restore();
        return;
    }

    // growTree(0, -len, len*0.8, angle-15, branchWidth*0.8);
    // growTree(0, -len, len*0.8, angle+15, branchWidth*0.8);
    window.requestAnimationFrame(growTree(0, -len, len*0.8, angle-15, branchWidth*0.8));
    window.requestAnimationFrame(growTree(0, -len, len*0.8, angle+15, branchWidth*0.8));

    ctx.restore();
    // animFrame=   requestAnimationFrame(growTree(0, -len, len*0.8, angle+15, branchWidth*0.8));

}

// while loop

