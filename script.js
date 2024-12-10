const gameContainer = document.getElementById('game-container');
const hole = document.getElementById('hole');
let apples = [];

function createApple() {
    const apple = document.createElement('div');
    apple.classList.add('apple');
    apple.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    gameContainer.appendChild(apple);

    let falling = true;
    const fallInterval = setInterval(() => {
        if (falling) {
            let top = parseFloat(window.getComputedStyle(apple).top || '0');
            if (top + 50 >= window.innerHeight) {
                falling = false;
            } else {
                apple.style.top = (top + 5) + 'px';
            }
        }
    }, 50);

    apple.addEventListener('mousedown', () => {
        falling = false;
        apple.classList.add('dragging');
    });

    apple.addEventListener('mousemove', (e) => {
        if (apple.classList.contains('dragging')) {
            apple.style.left = e.clientX - 25 + 'px';
            apple.style.top = e.clientY - 25 + 'px';

            // Check if apple is in the hole
            const holeRect = hole.getBoundingClientRect();
            const appleRect = apple.getBoundingClientRect();
            if (
                appleRect.left > holeRect.left &&
                appleRect.right < holeRect.right &&
                appleRect.top > holeRect.top &&
                appleRect.bottom < holeRect.bottom
            ) {
                apple.remove();
                clearInterval(fallInterval);
            }
        }
    });

    apple.addEventListener('mouseup', () => {
        apple.classList.remove('dragging');
    });

    apples.push(apple);
}

// Create apples at random intervals
setInterval(() => {
    createApple();
}, 2000);

// Apple styling
const style = document.createElement('style');
style.innerHTML = `
    .apple {
        position: absolute;
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, #ff4e00, #c13000);
        border-radius: 50%;
        top: 0;
    }
`;
document.head.appendChild(style);
