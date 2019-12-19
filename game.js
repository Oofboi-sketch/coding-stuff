let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 4;
let paddle1Y = 250;
let paddle2Y = 250;
const paddleHeight = 100;
let playerScore = 0;
let player2Score = 0;


function calcMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft
    let mouseY = evt.clientY - rect.top - root.scrollTop
    return {
        x:mouseX,
        y:mouseY 
    };


}

window.onload = function() {
    console.log('hello gey');
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    const fps = 30;
    setInterval(function() {
        moveEverythingX();
        moveEverythingY();
        drawEverything();
    }, 1000/fps);
    
    setInterval(function() {
        movePaddle2Y();
}, 1000/fps);

    canvas.addEventListener('mousemove',
    function(evt) {
        let mousePos = calcMousePos(evt)
        paddle1Y = mousePos.y - (paddleHeight/2);
    });
}

function movePaddle2Y() {
    if(ballY - 25 > paddle2Y) {
        paddle2Y = paddle2Y + 9;
    } else if(ballY + 25 < paddle2Y) {
        paddle2Y = paddle2Y - 9;
    }



}


function ballReset() {
    
    ballSpeedX = -ballSpeedX
    ballSpeedY = 0
    ballSpeedY = -ballSpeedY
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}


function moveEverythingX() {
    ballX = ballX + ballSpeedX;
  
    if(ballX >= canvas.width) {
        if (ballY > paddle2Y - 50 &&
            ballY < paddle2Y + paddleHeight) {
                ballSpeedX = -ballSpeedX;
                
            } else {
        ballReset();
        playerScore++;
            }
    }
     
    
    if(ballX <= 0) {
        if (ballY > paddle1Y &&
            ballY < paddle1Y + paddleHeight) {
                ballSpeedX = -ballSpeedX;
                let deltaY = ballY - (paddle1Y + 50)
                ballSpeedY = deltaY * 0.25
            } else {
        ballReset();
        player2Score++;
            }
    }

}
function moveEverythingY() {
    ballY = ballY + ballSpeedY;
  
    if(ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    } else if(ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

}

function drawEverything() {
    rectInfo(0, 0, canvas.width, canvas.height, 'black');
    rectInfo(0, paddle1Y, 10, 100, 'white');
    rectInfo(790, paddle2Y - 50, 10, 100, 'white');
    circleInfo(ballX, ballY, 10, 'white')
    canvasContext.fillText(playerScore, 100, 100);
    canvasContext.fillText(player2Score, 700, 100);
    canvasContext.fillText('uh oh stinky', canvas.width/2 - 25, canvas.height/2);
    
}

function circleInfo(centreX, centreY, radius, drawColour) {
    canvasContext.fillStyle = drawColour;
    canvasContext.beginPath();
  canvasContext.arc(centreX, centreY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
function rectInfo(sideX, TopY, width, height, drawColour) {
    canvasContext.fillStyle = drawColour;
    canvasContext.fillRect(sideX, TopY, width, height)

}