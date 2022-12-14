const stats = {
  score: 0,
  scoreP1: 0,
  scoreP2: 0,
  winScore: 100,
  turn: 'P1',
  doubleSix: false,
  finnished: false,
};

const resetStats = () => {
  stats.score = 0;
  stats.scoreP1 = 0;
  stats.scoreP2 = 0;
  stats.winScore = 100;
  stats.turn = 'P1';
  stats.doubleSix = false;
  stats.finnished = false;

  const p1 = document.querySelector('#player1 .side__text');
  const p2 = document.querySelector('#player2 .side__text');
  const winScore = document.querySelector('#winScore');

  p1.innerHTML = 'Player 1';
  p2.innerHTML = 'Player 2';
  winScore.value = 100;

  updateStats();
};

const getDiceImg = (val) => {
  switch (val) {
    case 1:
      return 'img/dice-1.png';
    case 2:
      return 'img/dice-2.png';
    case 3:
      return 'img/dice-3.png';
    case 4:
      return 'img/dice-4.png';
    case 5:
      return 'img/dice-5.png';
    case 6:
      return 'img/dice-6.png';
  }
};

const roll = () => Math.floor(Math.random() * 6) + 1;

const handleRoll = () => {
  if (stats.finnished) return;
  const d1 = roll(),
    d2 = roll();

  const d1Element = document.querySelector('#die1');
  const d2Element = document.querySelector('#die2');
  d1Element.src = getDiceImg(d1);
  d2Element.src = getDiceImg(d2);

  console.log(d1, ' ', d2);

  if (d1 === 6 && d2 === 6) {
    if (stats.doubleSix) {
      changeTurn(true);
    } else {
      stats.doubleSix = true;
      stats.score += d1 + d2;
    }
  } else if (d1 === 1 || d2 === 1) {
    changeTurn(false);
  } else stats.score += d1 + d2;

  updateStats();
};

const handleCollect = () => {
  if (stats.finnished) return;
  if (stats.turn === 'P1') stats.scoreP1 += stats.score;
  else stats.scoreP2 += stats.score;

  checkWin();
  stats.score = 0;
  updateStats();
  if (!stats.finnished) changeTurn(false);
};

const checkWin = () => {
  if (stats.scoreP1 >= stats.winScore) {
    const p1 = document.querySelector('#player1 .side__text');
    p1.innerHTML = 'WINNER';
    stats.finnished = true;
  } else if (stats.scoreP2 >= stats.winScore) {
    const p2 = document.querySelector('#player2 .side__text');
    p2.innerHTML = 'WINNER';
    stats.finnished = true;
  }
};

const changeTurn = (reset) => {
  if (stats.turn === 'P1') {
    if (reset) stats.scoreP1 = 0;
    stats.turn = 'P2';
    stats.score = 0;
    stats.doubleSix = false;
  } else {
    if (reset) stats.scoreP2 = 0;
    stats.turn = 'P1';
    stats.score = 0;
    stats.doubleSix = false;
  }

  updateStats();
};

const updateStats = () => {
  const p1 = document.querySelector('#player1');
  const p2 = document.querySelector('#player2');
  const p1Score = document.querySelector('#player1 .side__score');
  const p2Score = document.querySelector('#player2 .side__score');
  const score = document.querySelectorAll('.side__additional');

  p1Score.innerHTML = stats.scoreP1;
  p2Score.innerHTML = stats.scoreP2;

  if (stats.turn === 'P1') {
    p1.classList.add('active');
    p2.classList.remove('active');
  } else {
    p1.classList.remove('active');
    p2.classList.add('active');
  }

  score.forEach((item) => (item.innerHTML = '+' + stats.score));
};

// Handles the input where user enters max score to win.
const winScore = document.querySelector('#winScore');
winScore.onchange = (e) => {
  console.log(winScore.value);
  const value = e.target.value;

  if (value) stats.winScore = value;
  checkWin();
  updateStats();
};
