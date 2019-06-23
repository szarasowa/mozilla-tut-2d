
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var fillColor = '#0095DD';

function draw() {
    if (y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
        dy = -dy
        fillColor = "#"+((1<<24)*Math.random()|0).toString(16);
    }
    if (x + dx < ballRadius || x + dx > canvas.width-ballRadius) {
        dx = -dx;
        fillColor = "#"+((1<<24)*Math.random()|0).toString(16); //  https://stackoverflow.com/a/5365036/7606077
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
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

setInterval(draw, 10);