const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const settings = {
  dimensions: [1080, 1080],
};

const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
};

// const randomRange = function (min, max) {
//   return Math.random() * (max - min) + min;
// };

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "brown";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "white";

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.1;
    const h = height * 0.01;
    let x, y;

    const num = 40;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const angleSpacing = math.degToRad(360 / num);
      const angle = angleSpacing * i;

      x = cx + radius * Math.cos(angle);
      y = cy + radius * Math.sin(angle);

      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w * 0.5, random.range(5, -h * 5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(angle);

      context.lineWidth = random.range(7, 21);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        angleSpacing * random.range(1, -8),
        angleSpacing * random.range(1, 5)
      );
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
