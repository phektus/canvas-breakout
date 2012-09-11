// ball
var ballr = 10;
var x = 25;
var y = 250;
var dx = 1.5;
var dy = -4;

// paddle
var paddlex;
var paddleh = 10;
var paddlew = 75;

// bricks
var bricks;
var NROWS = 5;
var NCOLS = 5;
var BRICKWIDTH;
var BRICKHEIGHT = 15;
var PADDING = 1;

// controls
rightDown = false;
leftDown = false;

// canvas
var ctx;
var WIDTH;
var HEIGHT;
var canvasMinX = 0;
var canvasMaxX = 0;
var intervalId = 0;

// colors
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var paddlecolor = "#FFFFFF";
var ballcolor = "#FFFFFF";
var backcolor = "#000000";

// control mappings
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);

// game entry point
function init() {
    // canvas context
    ctx = $('#canvas')[0].getContext('2d'); 
    
    // canvas dimensions
    WIDTH = $('#canvas').width();
    HEIGHT = $('canvas').height();

    // paddle initial position
    paddlex = WIDTH / 2;

    // individual brick size
    BRICKWIDTH = (WIDTH/NCOLS) - 1;
    
    // set canvas bounds
    canvasMinX = $("#canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;

    // game loop
    intervalId = setInterval(draw, 10);
    return intervalId;
}

// draws a circl
function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

// draws a rectangle
function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

// clears the screen
function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // draw the background
    rect(0, 0, WIDTH, HEIGHT);
}

// set rightdown/leftdown if the right/left keys are down
function onKeyDown(evt) {
    if(evt.keyCode == 39) rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
}

// and unset on release
function onKeyUp(evt) {
    if(evt.keyCode == 39) rightDown = false;
    else if(evt.keyCode == 37) leftDown = false;
}

// move paddle if within canvas bounds
function onMouseMove(evt) {
    if(evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paddlex = evt.pageX - canvasMinX;
    }
}

function init_bricks() {
    bricks = new Array(NROWS);
    for(i=0; i<NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j<NCOLS; j++) {
            bricks[i][j] = 1;
        }
    }
}

function draw_bricks() {
    for(i=0; i<NROWS; i++) {
        ctx.fillStyle = rowcolors[i];
        for(j=0; j<NCOLS; j++) {
            // draw only active bricks
            if(bricks[i][j] == 1) {
                rect(
                    (j * (BRICKWIDTH + PADDING)) + PADDING,
                    (i * (BRICKHEIGHT + PADDING)) + PADDING,
                    BRICKWIDTH,
                    BRICKHEIGHT);
            }
        }
    }
}