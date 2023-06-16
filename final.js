const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cellW = canvas.width;
const cellH = Math.floor(canvas.height / 5);
const ballSpeedMax = 1;
const ballCount = 100;

//handle resize of window
window.addEventListener('resize', function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.beginPath();
    // ctx.arc(100, 75, 50, 0, Math.PI * 2);
    // ctx.strokeStyle = 'red';
    // ctx.stroke();
});

const randomFloat = (left, right) => {
    return Math.random() * (right - left) + left;
};

class Ball {
    constructor(ballSpeedMax) {
        this.radius = randomFloat(0, 50);
        this.r = randomFloat(0, 255);
        this.g = randomFloat(0, 255);
        this.b = randomFloat(0, 255);
        this.xSpeed = randomFloat(-ballSpeedMax, ballSpeedMax);
        this.ySpeed = randomFloat(-ballSpeedMax, ballSpeedMax);

        this.x = randomFloat(this.radius, cellW - this.radius);
        this.y = randomFloat(this.radius, cellH - this.radius);
    }
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x <= 0 + this.radius || this.x >= cellW - this.radius) {
            this.xSpeed *= -1;
            this.r = randomFloat(0, 255);
            this.b = randomFloat(0, 255);
            this.g = randomFloat(0, 255);
        };
        if (this.y <= 0 + this.radius || this.y >= cellH - this.radius) {
            this.ySpeed *= -1;
            this.r = randomFloat(0, 255);
            this.b = randomFloat(0, 255);
            this.g = randomFloat(0, 255);
        };
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r},${this.g}, ${this.b})`;
        ctx.fill();
    }
}


class Balls {
    constructor(ballCount, ballSpeedMax) {
        this.ballsArr = [];

        for (let i = 0; i < ballCount; i++) {
            this.ballsArr.push(new Ball(ballSpeedMax));
        }
    }
    updateAllBalls() {
        for (var ball of this.ballsArr) {
            ball.update();
        }
    }
    drawAllBalls() {
        for (var ball of this.ballsArr) {
            ball.draw();
        }

    }
}

var balls = new Balls(ballCount, ballSpeedMax);
const animate = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.updateAllBalls();
    balls.drawAllBalls();
    requestAnimationFrame(animate);
};
animate();

