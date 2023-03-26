const canvasSketch = require('canvas-sketch');
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [ 1080, 1080],
  animate: true
};

const ballCount = 80;
const rows = 5;
const cols = 1;
const cellW = settings.dimensions[0]/ cols;
const cellH = settings.dimensions[1]/ rows;

const sketch = ({ context, width, height }) => {
    balls = initBallRow();
    initWordRow(context);
    setInterval(drawWordRow, 3500, context)
    setInterval(fadeWordRow, 100 , context, [0, cellH ], cellW, cellH, 0.05)
  return drawOneFrame
};

canvasSketch(sketch, settings);

const drawOneFrame = ({context, width, height}) => {
    drawBallRow(context, balls);
};

const drawBallRow = (context, balls) => {
drawBlackBackground(context, [0, 0], cellW, cellH, 0.05);
drawRedLine(context,[0, cellH], cellW);
balls = updateBallPositions(balls);
drawBalls(context, balls);
};

const drawBlackBackground = (context, topLeft, width, height, alpha) => {
    [x, y] = topLeft

    context.fillStyle = `rgba(0, 0, 0 , ${alpha})`;
    context.fillRect(x, y, width, height);
};

const drawRedLine = (context, bottomLeft, width) => {
[x, y] = bottomLeft;

  context.strokeStyle = 'red';
  context.lineWidth = 4;

  context.beginPath();
  context.moveTo(x , y);
  context.lineTo(width , y);
  context.stroke();
};

const updateBallPositions = (balls) => {

  for(let i = 0; i < ballCount;  i++){
    const ball = balls[i]
    
    ball.x += ball.xSpeed
    ball.y += ball.ySpeed
    
    if (ball.x <= 0 + ball.radius || ball.x >= cellW - ball.radius){
      ball.xSpeed *= -1
      ball.r = random.range(0, 255)
      ball.b = random.range(0, 255)
      ball.g = random.range(0, 255)
    };
    if (ball.y <= 0 + ball.radius || ball.y >= cellH - ball.radius){
      ball.ySpeed *= -1
      ball.r = random.range(0, 255)
      ball.b = random.range(0, 255)
      ball.g = random.range(0, 255)
    };
  };
  return balls
};

const initBallRow = () => {

const balls = [];

for(let i = 0; i < ballCount;  i++){
  const ball ={
    radius: random.range(0, 50),
    r: random.range(0, 255),
    g: random.range(0, 255),
    b: random.range(0, 255),
    xSpeed: random.range(-1, 1),
    ySpeed: random.range(-1, 1),   
  };
  ball.x = random.range(ball.radius, cellW - ball.radius),
  ball.y = random.range(ball.radius, cellH - ball.radius),
  balls.push(ball) 

};
return balls
}

const drawBalls = (context, balls) => {
  
for(const ball of balls){
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = `rgba(${ball.r},${ball.g}, ${ball.b})`;
  context.fill();

}
}

const drawWordRow = (context) => {
  drawBlackBackground(context, [0, cellH ], cellW, cellH, 1);
  drawRedLine(context,[0, cellH * 2], cellW);
  drawWord(context)
}

const drawWord = (context) => {

  context.fillStyle = 'orange';
  context.font = '70px serif';
  context.textBaseline = 'middle';
  context.textAlign = 'center'
  const text = ['Be Afraid', 'Impending Doom', 'Improper Displays', 'Scared', 'Disturbed', 'Thriller', 'Slasher', 'Suge Knight', 'M. Knight Shymalan'];
  
  const randomIndex = Math.floor(Math.random() * text.length);
  const word = text[randomIndex]
  
  const metrics = context.measureText(word);
  
  // generate a number in [0, 1] -> Math.random()
  // generate a number in [a, b] -> Math.random() * (b - a) + a
  const mLeft = metrics.actualBoundingBoxLeft;//a
  const mRight = cellW - metrics.actualBoundingBoxRight;//b
  const mTop = metrics.actualBoundingBoxAscent;
  const mBottom = cellH - metrics.actualBoundingBoxDescent;
  const x = Math.floor(Math.random() * (mRight- mLeft) + mLeft);
  const y = Math.floor(Math.random() * (mBottom - mTop) + mTop) + cellH;
  context.fillText(word, x, y);
  }; 

const initWordRow = (context) => {
  drawBlackBackground(context, [0, cellH ], cellW, cellH, 1);
  drawRedLine(context,[0, cellH * 2], cellW);
};

const fadeWordRow = (context, topLeft, width, height, alpha) => {

  drawBlackBackground(context, topLeft, width, height, alpha);
  drawRedLine(context,[0, cellH * 2], cellW);
};

