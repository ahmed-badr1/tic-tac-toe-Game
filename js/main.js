let player = 'O';
let firstGame = true;
let winner = null;
let draw = null;

let xWins = 0;
let oWins = 0;
let drawCount = 0;

function updateValue(event) {
  const square = event.target;

  if (square.classList.contains('square')) {
    const isSquareEmpty = /^\s*$/gi.test(square.textContent);

    if(isSquareEmpty) {
      const playerValue = currentPlayer();
      square.setAttribute('data-value', playerValue);
      square.textContent = playerValue;
      winner = checkWinner(playerValue);
    }

    draw = checkDraw();
    if (winner || draw) return continuePlay();
    displayInfo(winner, draw);
  }
}

// Update The Current Player
function currentPlayer() {
  let swapCurrentPlayer = (player === 'O' ? 'X' : 'O');
  player = firstGame ? player : swapCurrentPlayer;
  firstGame = false;
  return player;
}

// Function To Display Information About The Current Game
function displayInfo(winner, draw) {
  let swapCurrentPlayer = (player === 'O' ? 'X' : 'O');
  nextPlayer = swapCurrentPlayer;
  const h2 = document.querySelector('.tic-tac-toe h2.info');
  h2.textContent = `${firstGame ? 'First Game:' : winner ? 'Winner:' : draw ? "Draw." : 'Next Player:'} ${firstGame || winner ? player : draw ? "" : nextPlayer }`

  if (firstGame || winner) {
    updateWinnerCounter(xWins, oWins);
  }

  if (firstGame || draw) {
    document.querySelector('.draw-count').textContent = drawCount;
  }
}

function updateWinnerCounter(xCount, oCount) {
  const x = document.querySelector('.x-count')
  const o = document.querySelector('.o-count')

  console.log(x, o);
  x.textContent = xCount;
  o.textContent = oCount;

  x.parentElement.classList.toggle('active', xCount > oCount);
  o.parentElement.classList.toggle('active', oCount > xCount);
  if (xCount == oCount) {
    x.parentElement.classList.remove('active');
    o.parentElement.classList.remove('active');
  }
}

// Determine who Is The Winner
function checkWinner(currentPlayer) {
  const winList = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  const winner = winList.some((win) => {

    return win.every((square) => {
      return currentPlayer === document.getElementById(square).dataset.value
    });

  });

  winner ? (currentPlayer.toLowerCase() === 'x' ? xWins++ : oWins++) : null;

  return winner;
}

// Check If All The Squares Is Full To Determine The Draw Status.
function checkDraw() {
  const squares = document.querySelectorAll('.game .squares .square');
  const draw = Array.from(squares).every((square) => {
    return square.textContent.trim();
  });

  draw ? drawCount++ : null;

  return draw;
}

// Function To Reset Values To Start New Game
function resetValues(resetAll=false) {
  player = 'O';
  firstGame = true;
  winner = null;
  draw = null;
  if (resetAll) {
    xWins = 0;
    oWins = 0
    drawCount = 0;
  }
}

// Reset Logic After Win Or Draw And After 3 Wins
document.querySelector('.game-controller .reset').addEventListener('click', () => continuePlay(true));
const originalGame = document.querySelector('.squares').cloneNode(true);

function continuePlay(resetAll=false) {
  // This Is Copy From Squares Before Any interactions
  const currentGame = document.querySelector('.squares');
  const gameContainer = document.querySelector('.game');

  // Note:- we should add cloneNode from the cloneNode to preserve the original cloneNode pure Because we will use this again.
  gameContainer.replaceChild(originalGame.cloneNode(true), currentGame);

  resetValues(resetAll);
  app();
}

function app() {
  displayInfo(winner, draw);
  const game = document.querySelector('.tic-tac-toe .game .squares');
  game.addEventListener('click', updateValue);
}
app();