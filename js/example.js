const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const branches = [];
const leaves = [];
const trunkHeight = 170;
let hues = [70, 20];
let hueIndex = 0;
let currentHue = hues[0];
let drawLeaves;
let animFrame;

class Branch {
  constructor(x, y, length, angle, speed, width) {
    this.x = x;
    this.y = y;
    this.curLength = 0;
    this.length = length;
    this.angle = angle;
    this.interpolant = 0;
    this.speed = speed;
    this.width = Math.max(width, 2);
    this.done = false;
    this.lengthLimit = 40 + Math.random() * 30;
  }
  
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI);
    ctx.beginPath();
    // Set Y to -3 to hide most of the visible gaps between branches
    ctx.moveTo(0, -3); 
    ctx.lineTo(0, this.interpolant * this.length);
    ctx.closePath();
    ctx.lineWidth = this.width;
    ctx.stroke();
    ctx.restore();
  }
  update() {
    if (!this.done) {
      const x = this.x + Math.sin(this.angle) * this.interpolant * this.length;
      const y = this.y - Math.cos(this.angle) * this.interpolant * this.length;
      if (this.interpolant < 1) {
        this.interpolant += this.speed;
        
        // Add leaves only to smaller branches at random intervals
        if (drawLeaves && this.length < 120 && Math.random() > 0.85) {
           leaves.push(new Leaf(x, y));
        }
      }
      // Branch has reached it's target length
      else {
        // Create new branches only if branch is long enough
        if (this.length >= this.lengthLimit) {
          const amount = 2 + Math.floor(Math.random() * 2);

          // Create new branches. I decided to use random angles to add more variety,
          // but that makes it possible for branches to go in the same direction...
          for (let i = 0; i < amount; i++) {
            branches.push(new Branch(
              x,
              y,
              this.length * (0.72 + (Math.random() / 10)),
              this.angle + Math.sin(Math.random() * Math.PI * 2) * Math.PI / 4,
              .01 + Math.random() / 30,
              this.width - 3
            ));
          }
        }
        this.done = true;
      }
    }
  }
}

class Leaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 50 + Math.random() * 20; //
    this.scale = 0.01;
    this.maxScale = 1 + Math.random() / 4;
    this.speed = 0.02 + Math.random() / 20;
    this.hue = Math.floor(currentHue + Math.random() * 50);
    this.lightness = Math.floor(50 - Math.random() * 20);
    this.rotation = Math.sin(Math.random() * 2 * Math.PI) * 5;
  }
  draw() {
    ctx.strokeStyle = `hsl(${this.hue}, 60%, ${this.lightness}%)`;
    ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.rotation);
    
    // Draw leaf
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-20, 10, 0, this.length / 2);
    ctx.quadraticCurveTo(20, 10, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw the line in the middle
    ctx.beginPath();
    ctx.moveTo(0, (this.length / 2) - 10);
    ctx.strokeStyle = '#0002';
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
  update() {
    if (this.scale < this.maxScale) {
      this.scale += this.speed;
    }
  }
}


function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.strokeStyle = '#532';
  cancelAnimationFrame(animFrame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  branches.splice(0, branches.length);
  leaves.splice(0, leaves.length);
  currentHue = hues[hueIndex++ % hues.length];
  drawLeaves = document.querySelector('#leaves').checked;
  branches.push(new Branch(0, 0, trunkHeight, 0, 0.03, 20));
  // Couple of extra trees, enable if you wish
  // branches.push(new Branch(-400, 0, 160 + Math.random() * 40, 0, 0.01 + Math.random() / 30, 20));
  // branches.push(new Branch(400, 0, 160 + Math.random() * 40, 0, 0.01 + Math.random() / 30, 20));
  loop();
}

init();

function loop() {
  ctx.save();
  ctx.translate(-10 + canvas.width / 2, canvas.height);
  
  branches.forEach((b, i) => {
    if (!b.done) {
      b.draw();
      b.update();
    } else {
      branches.splice(i, 1);
    }
  });
  leaves.forEach((l, i) => {
    if (l.scale < l.maxScale) {
      l.draw();
      l.update();
    } else {
      leaves.splice(i, 1);
    }
  });
  ctx.restore();
  
  // Request animation frame only if there is something to animate
  if (leaves.length || branches.length) {
    animFrame = requestAnimationFrame(loop);
  }
}