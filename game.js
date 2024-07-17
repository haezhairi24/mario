const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 1.5;
let player = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    speed: 5,
    dy: 0,
    jumping: false,
    color: 'red'
};

let keys = {
    left: false,
    right: false,
    up: false
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        keys.right = true;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        keys.left = true;
    } else if (e.key === 'ArrowUp' || e.key === 'Up' && !player.jumping) {
        keys.up = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        keys.right = false;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        keys.left = false;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        keys.up = false;
    }
});

document.getElementById('leftBtn').addEventListener('touchstart', () => keys.left = true);
document.getElementById('leftBtn').addEventListener('touchend', () => keys.left = false);
document.getElementById('rightBtn').addEventListener('touchstart', () => keys.right = true);
document.getElementById('rightBtn').addEventListener('touchend', () => keys.right = false);
document.getElementById('jumpBtn').addEventListener('touchstart', () => {
    if (!player.jumping) {
        keys.up = true;
    }
});
document.getElementById('jumpBtn').addEventListener('touchend', () => keys.up = false);

function update() {
    if (keys.right) {
        player.x += player.speed;
    }
    if (keys.left) {
        player.x -= player.speed;
    }
    if (keys.up && !player.jumping) {
        player.dy = -20;
        player.jumping = true;
    }

    if (player.y + player.height < canvas.height) {
        player.dy += gravity;
    } else {
        player.dy = 0;
        player.jumping = false;
        player.y = canvas.height - player.height;
    }
    player.y += player.dy;

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

update();
