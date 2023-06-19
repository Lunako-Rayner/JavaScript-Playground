const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const cellW = canvas.width;
const cellH = Math.floor(canvas.height / 5);
const ballSpeedMax = 1;
const ballCount = 100;
const wordsArr = ['Be Afraid', 'Impending Doom', 'Smile', 'Yikes', 'Improper Displays', 'Scared', 'Disturbed', 'Thriller', 'Slasher', 'Suge Knight', 'M. Knight Shymalan'];

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

class Words {
    constructor() {

    }
    update() {
        let randomIndex = Math.floor(Math.random() * wordsArr.length);
        this.word = wordsArr[randomIndex];
        let metrics = ctx.measureText(this.word);
        const left = metrics.actualBoundingBoxLeft;
        const right = cellW - metrics.actualBoundingBoxRight;
        const top = cellH + metrics.actualBoundingBoxAscent;
        const bottom = (cellH * 2) - metrics.actualBoundingBoxDescent;

        this.positionX = Math.floor(randomFloat(left, right));
        this.positionY = Math.floor(randomFloat(top, bottom));
    };
    draw() {
        ctx.beginPath();
        ctx.font = '70px copperplate';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'orange';
        ctx.fillText(this.word, this.positionX, this.positionY);
    };
    drawOneWord() {
        this.update();
        this.draw();
    };
    fadeWords() {
        const alpha = 0.05;
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillRect(0, cellH + 1, cellW, cellH);
    }
}

let words = new Words();

setInterval(words.drawOneWord.bind(words), 3500);
setInterval(words.fadeWords.bind(words), 100);

const animate = function () {
    ctx.clearRect(0, 0, canvas.width, cellH + 1);
    balls.updateAllBalls();
    balls.drawAllBalls();
    requestAnimationFrame(animate);
};
animate();

