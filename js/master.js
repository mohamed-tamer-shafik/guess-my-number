//state variables starts
let mysteryNumber, score;
//state variables ends
//game mods variable starts
let gameMode;
const scoreList = {
  easy: 20,
  medium: 10,
  hard: 5,
};
let highScore = {
  easy: 0,
  medium: 0,
  hard: 0,
};
//game mods variable ends

//display methods starts
//methods to display score state variable
const displayScore = score =>
  (document.querySelector('.score-counter').textContent = score);
//methods to display highscore state variable
const displayHighScore = () =>
  (document.querySelector('.high-score-counter').textContent =
    highScore[gameMode]);

//methods to display message field
const displayMessage = msg =>
  (document.querySelector('.msg').textContent = msg);

//display methods ends

//method for computing mystery number and score
const computingMysteryAndScore = function () {
  mysteryNumber = Math.trunc(Math.random() * 20) + 1;
  score = scoreList[gameMode];
  displayScore(score);
};

//method for setting some styles to thier default values
const setDefault = function () {
  document.querySelector('.left input').value = '';
  document.querySelector('.parent').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '140px';
  document.querySelector('.number').textContent = '?';
  console.log('invoked');
  displayMessage('Start guessing...');
};

// navigation between pages starts

//function that takes the class name  of pages that you want to navigte through
const navigate = function (from, to) {
  document.querySelector(from).style.display = 'none';
  document.querySelector(to).style.display = 'block';
};
// function that handle choosing the game mode
document.querySelectorAll('.game-mode .mode').forEach(mode => {
  mode.addEventListener('click', e => {
    navigate('.game-mode', '.game');
    gameMode = e.target.dataset.mode;
    computingMysteryAndScore();
    displayHighScore(highScore[gameMode]);
  });
});
// navigation between pages ends

//number checking starts
document.querySelector('.left button').addEventListener('click', function () {
  const guess = Number(document.querySelector('.left input').value);
  const parent = document.querySelector('.parent');
  const numberField = document.querySelector('.number');
  if (!guess) {
    displayMessage(`please enter a number between 1 and 20 🔢`);
  } else if (guess === mysteryNumber) {
    numberField.textContent = guess;
    numberField.style.width = '200px';
    parent.style.backgroundColor = 'green';
    displayMessage('you won ! 🏆');
    if (score > highScore[gameMode]) {
      highScore[gameMode] = score;
      displayHighScore(highScore[gameMode]);
    }
  } else {
    if (score > 1) {
      displayMessage(guess > mysteryNumber ? 'too high 📈' : 'too low 📉');
      displayScore(--score);
    } else {
      displayMessage('game over ! 😭');
      displayScore(0);
      parent.style.backgroundColor = 'red';
    }
  }
});
//number checking ends

//again functionality starts
document.querySelector('.again').addEventListener('click', function () {
  computingMysteryAndScore();
  setDefault();
});
//again functionality ends

//return button functionality starts
document.querySelector('.return').addEventListener('click', function () {
  navigate('.game', '.game-mode');
  setDefault();
});
//return button functionality ends
