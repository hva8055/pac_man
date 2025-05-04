const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const width = 10;
let pacmanIndex = 11;
let score = 0;
let ghostIndex = 88; // Position for the ghost
let gameOver = false;

const layout = [
  1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,1,
  1,0,1,1,0,1,1,0,0,1,
  1,0,1,1,0,1,1,0,0,1,
  1,0,0,0,0,0,0,0,0,1,
  1,0,1,1,0,1,1,0,0,1,
  1,0,1,1,0,1,1,0,0,1,
  1,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1
];

const squares = [];

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    if (layout[i] === 1) {
      square.classList.add('wall');
    } else {
      square.innerHTML = '<div class="dot"></div>';
    }

    grid.appendChild(square);
    squares.push(square);
  }

  squares[pacmanIndex].classList.add('pacman');
  squares[ghostIndex].classList.add('ghost');
}

function movePacman(e) {
  if (gameOver) return;
  squares[pacmanIndex].classList.remove('pacman');

  switch (e.key) {
    case 'ArrowUp':
      if (pacmanIndex - width >= 0 && !squares[pacmanIndex - width].classList.contains('wall')) {
        pacmanIndex -= width;
      }
      break;
    case 'ArrowDown':
      if (pacmanIndex + width < width * width && !squares[pacmanIndex + width].classList.contains('wall')) {
        pacmanIndex += width;
      }
      break;
    case 'ArrowLeft':
      if (pacmanIndex % width !== 0 && !squares[pacmanIndex - 1].classList.contains('wall')) {
        pacmanIndex -= 1;
      }
      break;
    case 'ArrowRight':
      if (pacmanIndex % width < width - 1 && !squares[pacmanIndex + 1].classList.contains('wall')) {
        pacmanIndex += 1;
      }
      break;
  }

  squares[pacmanIndex].classList.add('pacman');

  // Eat dot
  if (squares[pacmanIndex].querySelector('.dot')) {
    squares[pacmanIndex].querySelector('.dot').remove();
    score++;
    scoreDisplay.textContent = score;
  }

  checkGameOver();
}

function moveGhost() {
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  let nextIndex = ghostIndex + direction;
  if (!squares[nextIndex].classList.contains('wall')) {
    squares[ghostIndex].classList.remove('ghost');
    ghostIndex = nextIndex;
    squares[ghostIndex].classList.add('ghost');
  }

  checkGameOver();
}

function checkGameOver() {
  if (pacmanIndex === ghostIndex) {
    gameOver = true;
    alert('Game Over! You were caught by a ghost.');
    document.removeEventListener('keydown', movePacman);
    clearInterval(ghostTimer);
  }
}

createBoard();
document.addEventListener('keydown', movePacman);
const ghostTimer = setInterval(moveGhost, 30);
