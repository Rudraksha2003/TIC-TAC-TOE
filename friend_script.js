// Friend script (friend_script.js)

// Initialize the friend mode
function initFriendMode() {
  let cells = document.querySelectorAll('.cell');
  let restartBtn = document.getElementById('restartBtn');
  let playerTurn = document.getElementById('player-turn');
  let currentPlayer = 'X';
  let gameActive = true; // Flag to track if the game is still active
  let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      if (gameActive && !cell.textContent) {
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
          highlightWinningCells(currentPlayer);
          gameActive = false; // Set gameActive to false when someone wins
          updatePlayerTurn();
          return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerTurn();
      }
    });
  });

  function checkWin(player) {
    return winningCombinations.some(combination => {
      return combination.every(index => cells[index].textContent === player);
    });
  }

  function highlightWinningCells(player) {
    const winningCombination = winningCombinations.find(combination => {
      const [a, b, c] = combination;
      return cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player;
    });

    if (winningCombination) {
      winningCombination.forEach(idx => cells[idx].classList.add(`winning-box-${player.toLowerCase()}`));
    }
  }

  function updatePlayerTurn() {
    if (gameActive) {
      playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
    } else {
      playerTurn.textContent = `${currentPlayer} wins!`;
    }
  }

  function goToHome() {
    window.location.href = 'index.html';
  }

  restartBtn.addEventListener('click', restart);

  function restart() {
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('winning-box-x', 'winning-box-o');
    });

    // Reset gameActive to true when restarting
    gameActive = true;

    // Randomly set the first player
    currentPlayer = Math.random() < 0.5 ? 'X' : 'O';

    updatePlayerTurn();
  }

  // Initial setup
  updatePlayerTurn();
}
