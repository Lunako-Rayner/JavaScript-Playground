const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, Math.PI * 2);
    ctx.strokeStyle = 'red';
    ctx.stroke();
});

class Ball {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 50;
        this.sizeChangeSpeed = 2;
        this.speedX = Math.random() * 10 - 5;
        this.speedY = Math.random() * 10 - 5;
        this.colour = 'red';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size += this.sizeChangeSpeed;
        this.size = Math.abs(this.size)
        this.sizeChangeSpeed = Math.random() * 4 - 2
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.strokeStyle = this.colour;
        ctx.stroke();
    }
}

var ball = new Ball();

const animate = function () {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ball.update();
    ball.draw();
    requestAnimationFrame(animate);
};
animate();
