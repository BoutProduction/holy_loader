
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


let treeArray = [];
let dustArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

class Tree {
  constructor() {
    this.width = parseInt(Math.random() * 100 + 10);
    this.height = canvas.height;
    this.positionX = parseInt(Math.random() * canvas.width - 200 + 200);
  }}


class Dust {
  constructor() {
    this.width = parseInt(Math.random() * 5 + 1);
    this.positionX = parseInt(Math.random() * canvas.width * 0.9);
    this.positionY = parseInt(Math.random() * canvas.height * 0.7);
    this.opacity = 0;
  }}


let createObject = (objectArray, ParticleObject, particleMax) => {
  for (let i = 0; i < particleMax; i++) {
    let particleObject = new ParticleObject();
    objectArray.push(particleObject);
  }


  objectArray.sort((a, b) => a.width - b.width);
};

let drawTree = treeObject => {
  context.beginPath();


  let baseGradient = context.createLinearGradient(
  treeObject.positionX,
  0,
  treeObject.positionX + treeObject.width,
  2);

  baseGradient.addColorStop(0.5, "hsl(204, 80%, 10%)");
  baseGradient.addColorStop(0.9, "hsl(204, 95%, 15%)");
  baseGradient.addColorStop(1, "hsl(204, 90%, 12.5%)");


  let depthOverlay = Math.abs(treeObject.width / 100 - 1).toFixed(2);
  treeObject.height = parseInt(
  canvas.height * (treeObject.width / 100) + canvas.height * 0.6);



  let overlayGradient = context.createLinearGradient(0, canvas.height, 0, 20);
  overlayGradient.addColorStop(0.2, "hsla(204, 80%, 15%, 1)");
  overlayGradient.addColorStop(
  0.9,
  "hsla(204, 10%, " + 30 * depthOverlay + "%, " + depthOverlay + ")");


  context.fillStyle = baseGradient;
  context.fillRect(
  treeObject.positionX,
  0,
  treeObject.width,
  treeObject.height);

  context.fillStyle = overlayGradient;
  context.fillRect(
  treeObject.positionX,
  0,
  treeObject.width,
  treeObject.height);


  context.closePath();
  moveTree(treeObject);
};

let drawDust = dustObject => {
  context.save();

  moveDust(dustObject);

  context.beginPath();
  context.arc(
  dustObject.positionX,
  dustObject.positionY,
  dustObject.width,
  0,
  2 * Math.PI);

  context.fillStyle = "rgba(255, 255, 255, " + dustObject.opacity + ")";
  context.shadowBlur = 10;
  context.shadowColor = "white";
  context.fill();

  context.closePath();
  context.restore();
};

let moveTree = treeObject => {
  treeObject.positionX += parseInt(treeObject.width / 150 * 3 + 1);
  if (treeObject.positionX > canvas.width) {
    treeObject.positionX = 0 - treeObject.width;
  }
};

let moveDust = dustObject => {
  dustObject.positionX += parseInt(dustObject.width / 4 * 3 + 1);
  dustObject.positionY += -1;

  if (dustObject.positionX > canvas.width)
  dustObject.positionX = 0 - dustObject.width;
  if (dustObject.positionY < 0) {
    dustObject.positionY = canvas.height - dustObject.width;
    dustObject.opacity = 0;
  } else if (dustObject.positionY > 0 && dustObject.opacity < 1.0) {
    dustObject.opacity += 0.005;
  }
};

let drawStage = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0, n = dustArray.length, m = 0; i < n; i++) {
    if (i % 6 == 0) {
      drawTree(treeArray[m]);
      m++;
    }
    drawDust(dustArray[i]);
  }

  requestAnimationFrame(drawStage);
};

let init = () => {
  createObject(treeArray, Tree, 15);
  createObject(dustArray, Dust, 90);
  drawStage();
};


init();