// Obtener el canvas y el contexto de dibujo
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Definir el tamaño de la pelota y las palas
const ballRadius = 10;
const paddleWidth = 10;
const paddleHeight = 100;

// Velocidades
let ballSpeedX = 5;
let ballSpeedY = 5;
let paddleSpeed = 20;

// Definir las palas
let leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, up: false, down: false };
let rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, up: false, down: false };

// Crear la pelota
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: ballSpeedX, dy: ballSpeedY };

// Función para dibujar las palas
function drawPaddle(x, y) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

// Función para dibujar la pelota
function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

// Función para mover las palas
function movePaddles() {
    // Movimiento de la pala izquierda
    if (leftPaddle.up && leftPaddle.y > 0) {
        leftPaddle.y -= paddleSpeed;
    } else if (leftPaddle.down && leftPaddle.y < canvas.height - paddleHeight) {
        leftPaddle.y += paddleSpeed;
    }

    // Movimiento de la pala derecha
    if (rightPaddle.up && rightPaddle.y > 0) {
        rightPaddle.y -= paddleSpeed;
    } else if (rightPaddle.down && rightPaddle.y < canvas.height - paddleHeight) {
        rightPaddle.y += paddleSpeed;
    }
}

// Función para mover la pelota
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Rebotar en las paredes superior e inferior
    if (ball.y - ballRadius <= 0 || ball.y + ballRadius >= canvas.height) {
        ball.dy = -ball.dy;
    }

    // Rebotar en las palas
    if (ball.x - ballRadius <= leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
        ball.dx = -ball.dx;
    } else if (ball.x + ballRadius >= rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
        ball.dx = -ball.dx;
    }

    // Si la pelota sale de la pantalla, reiniciar
    if (ball.x - ballRadius <= 0 || ball.x + ballRadius >= canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = ballSpeedX;
        ball.dy = ballSpeedY;
    }
}

// Función para actualizar el juego
function update() {
    movePaddles();
    moveBall();
}

// Función para dibujar todos los elementos
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo

    // Dibujar palas
    drawPaddle(leftPaddle.x, leftPaddle.y);
    drawPaddle(rightPaddle.x, rightPaddle.y);

    // Dibujar la pelota
    drawBall(ball.x, ball.y);
}

// Función para controlar los eventos del teclado
function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        rightPaddle.up = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        rightPaddle.down = true;
    }

    if (e.key == "w" || e.key == "W") {
        leftPaddle.up = true;
    } else if (e.key == "s" || e.key == "S") {
        leftPaddle.down = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        rightPaddle.up = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        rightPaddle.down = false;
    }

    if (e.key == "w" || e.key == "W") {
        leftPaddle.up = false;
    } else if (e.key == "s" || e.key == "S") {
        leftPaddle.down = false;
    }
}

// Configurar los eventos de teclado
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Función principal del juego
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop); // Llamar a gameLoop repetidamente para crear la animación
}

// Iniciar el juego
gameLoop();
