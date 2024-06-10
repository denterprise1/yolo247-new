const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset-button');
const startScreen = document.getElementById('start-screen');
const playButton = document.getElementById('play-button');

let score = 0;
let activeHole = null;
let timer = null;

function getRandomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function showMole() {
    if (activeHole) {
        activeHole.querySelector('.mole').style.display = 'none';
    }
    activeHole = getRandomHole();
    const mole = activeHole.querySelector('.mole');
    mole.style.display = 'block';
    mole.addEventListener('click', hitMole);
    timer = setTimeout(hideMole, 1000);
}

function hideMole() {
    if (activeHole) {
        const mole = activeHole.querySelector('.mole');
        mole.style.display = 'none';
        mole.removeEventListener('click', hitMole);
    }
    showMole();
}

function hitMole() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    hideMole();
    clearTimeout(timer);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    resetButton.style.display = 'block';
    showMole();
}

function resetGame() {
    clearTimeout(timer);
    if (activeHole) {
        activeHole.querySelector('.mole').style.display = 'none';
        activeHole.querySelector('.mole').removeEventListener('click', hitMole);
    }
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    showMole();
}

playButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    startGame();
});

resetButton.addEventListener('click', resetGame);
