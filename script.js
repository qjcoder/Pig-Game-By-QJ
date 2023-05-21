'use strict';
//Variable Declare and HTML access by Javascript
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const scoreHold = document.querySelector('.btn--hold');

let score, activePlayer, currentScore, playing;
const reGame = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
reGame();

const switchPlayer = function () {
  currentScore = 0; //reset current player score to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // change the active player
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active'); //reset current player score to 0
};
// roll dice condition
rollDice.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScore0.textContent = currentScore; // change
    } else {
      switchPlayer();
    }
  }
});
scoreHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    score[activePlayer] = document.getElementById(
      `score--${activePlayer}`
    ).textContent = score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', reGame);
