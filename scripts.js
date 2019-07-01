
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var htmlBody = document.getElementsByTagName('body');
var h1 = document.getElementById('points');

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

// var bouncing = 0;
var score = 0;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 10;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

function draw() {
    if (y + dy < ballRadius) {
        dy = -dy;
        fillColor = "#"+((1<<24)*Math.random()|0).toString(16);
     } 
     else if (y + dy > canvas.height-ballRadius) {

        if (x >= paddleX && x <= paddleX+paddleWidth) {
            dy = -dy
            // bouncing++;
            // h1.innerHTML = bouncing;
        } 
        else {
            alert('game over!\n points: ' + score);
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
    drawBrick();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
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

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

function drawBrick() {
    for(var c = 0; c<brickColumnCount; c++) {
        for(var r = 0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = fillColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(var c = 0; c < brickColumnCount; c++) {
        for(var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == (brickColumnCount*brickRowCount)) {
                        alert("You win! Points: " + score);
                        window.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = fillColor;
    ctx.fillText("Score: " + score, 8, 20);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var realativeX = e.clientX - canvas.offsetLeft;
    if (realativeX > 0 && realativeX < canvas.width) {
        paddleX = realativeX - paddleWidth/2;
    }
}

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