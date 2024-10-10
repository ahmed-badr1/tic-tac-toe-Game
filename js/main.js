let player = 'O';
let firstGame = true;

function updateValue(event) {
  const square = event.target;

  if (square.classList.contains('square')) {
    const isSquareEmpty = /^\s*$/gi.test(square.textContent);
    if(isSquareEmpty) {
      const playerValue = currentPlayer();
      square.textContent = playerValue;
      square.setAttribute('data-value', playerValue);
    }
    displayInfo();
  }
}

// Update The Current Player
function currentPlayer() {
  let swapCurrentPlayer = (player === 'O' ? 'X' : 'O');
  player = firstGame ? player : swapCurrentPlayer;
  firstGame = false;
  return player;
}

// Function TO Display Information About The Current Game
function displayInfo() {
  let swapCurrentPlayer = (player === 'O' ? 'X' : 'O');
  nextPlayer = swapCurrentPlayer;
  const h2 = document.querySelector('.tic-tac-toe h2.info');
  h2.textContent = `${firstGame ? 'First Game:' : (checkWinner() ? 'Winner:' : 'Next Player:')} ${firstGame ? player : nextPlayer}`;
}
displayInfo();

// Determine who Is The Winner
function checkWinner() {
const winList = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  return false;
}

const game = document.querySelector('.tic-tac-toe .squares');
game.addEventListener('click', updateValue);
