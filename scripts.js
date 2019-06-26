
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var fillColor = '#0095DD';

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) /2;

var rightPressed = false;
var leftPressed = false;

var points = 0;

function draw() {
    if (y + dy < ballRadius) {
        dy = -dy;
        fillColor = "#"+((1<<24)*Math.random()|0).toString(16);
     } 
     else if (y + dy > canvas.height-ballRadius) {

        if (x >= paddleX && x <= paddleX+paddleWidth) {
            dy = -dy
            points++;
        } 
        else {
            alert('game over!\n points: '+points);
            window.location.reload();
            clearInterval(interval);
        }
    }

    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
        fillColor = "#"+((1<<24)*Math.random()|0).toString(16); //  https://stackoverflow.com/a/5365036/7606077
    }

    // if pressing key >> move paddle 
    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.closePath();
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    console.log("pressed key: " + e.key);
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

var interval = setInterval(draw, 10);