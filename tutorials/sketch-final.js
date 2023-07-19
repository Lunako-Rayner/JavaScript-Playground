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

let last = 0;
const sketch = ({ context, width, height }) => {
  return ({ context, width, height, time }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    for (let row = 0; row < rows; row++){
      for(let col = 0; col < cols; col++){
        // Make the top left of this cell (0,0)
        // context.save()
        const x = cellW * col;
        const y = cellH * row; 
        //context.translate(x, y)
        context.setTransform(1, 0, 0, 1, x, y)

        
        // Draw red lines for each cell
        context.strokeStyle = 'red';
        context.lineWidth = 4;
        
        context.beginPath();
        context.moveTo(0 , 0);
        context.lineTo(cellW , 0);
        context.stroke();
        // console.log(row, col, x, y )
        // context.restore()

        //Drawing balls in row = 0
        if (row === 0){
          for(let i = 0; i < ballCount;  i++){
            const ball = balls[i]
            
            // It changes the position by x/y.Speed. Makes ball move.
            ball.x += ball.xSpeed
            ball.y += ball.ySpeed
            
            // Changes direction when it hits the edge
            // ball.xSpeed = ball.x <= 0 || ball.x >= cellW ? ball.xSpeed * -1 : ball.xSpeed 
            // ball.ySpeed = ball.y <= 0 || ball.y >= cellH ? ball.ySpeed * -1 : ball.ySpeed 
            
            // change direction when radius hits the edge.
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
            context.save()
            //Draw the ball
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            context.fillStyle = `rgba(${ball.r},${ball.g}, ${ball.b})`;
            context.fill();
            context.restore();
          };
          //Fading words in row = 1
        } else if(row === 1){
          
          fadeOut(context, x, y);
          setTimeout(fadeOut, 200, context, x, y);
          runEvery(drawWord, 2, time, context, x, y);
          
        };
      }
    }
  }
}
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

// let last = 0;
// let num = 0;
// let speed = 2;

// function main(timeStamp) {
//   let timeInSecond = timeStamp / 1000;

//   if (timeInSecond - last >= speed) {
//     last = timeInSecond;
//     console.log(++num);
//   }

function runEvery(func, interval, currentTime, context, x, y){
if (currentTime - last >= interval){
  last = currentTime;
  func(context, x, y)
}
}


function drawWord(context, x, y){ 
  
  //context.translate(x, y)
  context.save();
  context.setTransform(1, 0, 0 , 1 , x, y);

  //Draw words with colour
  context.fillStyle = 'orange';
  context.font = '100px serif';
  context.textBaseline = 'middle';
  context.textAlign = 'center'
  const text = ['Be Afraid', 'Impending Doom', 'Improper Displays', 'Scared', 'Disturbed', 'Thriller', 'Slasher', 'Suge Knight', 'M. Knight Shymalan'];
  
  const random = Math.floor(Math.random() * text.length);
  context.fillText(text[random], cellW/2, cellH/2);
  
  // function has a delay. Need to give params r, c
  context.restore();
}

function fadeOut(context, x, y) {
  //translate to cell I want
  context.save()
  
  context.translate(x, y);
  context.setTransform(1, 0, 0 ,1 , x, y)

  
  //draw see-through black rect.
  context.fillStyle = 'rgba(0, 0, 0 , 0.01)';
  context.fillRect(0, 0, cellW, cellH);
  
  context.restore()
  
}
canvasSketch(sketch, settings);
