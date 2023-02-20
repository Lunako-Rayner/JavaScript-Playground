const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ context, width, height }) => {
  let ballCount = 100;
  let x = [];
  let y = [];
  let xSpeed = [];
  let ySpeed = [];
  let size = [];
  let bAngle = 0;
  let fAngle = 2 * Math.PI;
  let colours = [];

  const getRandomColour = function () {
    let letters = "0123456789ABCDEF";
    let colour = "#";
    for (let i = 0; i < 6; i++) {
      colour += letters[Math.floor(Math.random() * letters.length)];
    }
    return colour;
  };
  for (let c = 0; c < ballCount; c++) {
    x[c] = (width / 4) * 3;
    y[c] = height / 4;
    xSpeed[c] = random.range(-5, 5);
    ySpeed[c] = random.range(-5, 5);
    colours[c] = getRandomColour();
    size[c] = random.range(10, 50);
  }
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(0, height / 2, width), context.lineTo(width, height / 2);
    context.stroke();

    context.fillStyle = "pink";
    context.fillRect(0, 0, width / 2, height / 2);
    context.fillStyle = "rgba(127,255,212)";
    context.fillRect(width / 2, 0, width / 2, height / 2);
    context.fillStyle = "lemonchiffon";
    context.fillRect(0, height / 2, width / 2, height / 2);
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        let x = width / 8;
        let y = height / 8;
        let radius = 100;
        let sAngle = 0;
        let eAngle = 2 * Math.PI;

        context.beginPath();
        context.arc(x + 50 * i, y + 50 * j, radius, sAngle, eAngle);
        context.stroke();
      }
    }

    for (let c = 0; c < ballCount; c++) {
      x[c] = x[c] + xSpeed[c];
      y[c] = y[c] + ySpeed[c];

      if (x[c] - size[c] <= width / 2 || x[c] + size[c] >= width) {
        xSpeed[c] *= -1;
      }
      if (y[c] - size[c] <= 0 || y[c] + size[c] >= height / 2) {
        ySpeed[c] *= -1;
      }
      console.log("WORK!!!!");
      context.save();
      context.translate(x[c], y[c]);
      context.beginPath();
      context.arc(0, 0, size[c], bAngle, fAngle);
      context.fillStyle = colours[c];
      context.fill();
      context.restore();
    }
  };
};
canvasSketch(sketch, settings);
