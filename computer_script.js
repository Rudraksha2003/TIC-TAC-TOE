// Computer script (computer_script.js)

// Initialize the computer mode
function initComputerMode() {
    let cells = document.querySelectorAll('.cell');
    let restartBtn = document.getElementById('restartBtn');
    let playerTurn = document.getElementById('player-turn');
    let currentPlayer;
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

    // Check if the mode is set to computer
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    if (mode === 'computer') {
        // Randomly select X or O for the first player
        currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
        updatePlayerTurn();
        if (currentPlayer === 'O') {
            // Computer makes the first move if it is O
            makeComputerMove();
        }
    } else {
        // In the default mode (playing with a friend), randomly select X or O for the first player
        currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
        updatePlayerTurn();
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (gameActive && !cell.textContent && currentPlayer === 'X') {
                // Only allow the player to make a move when it's their turn
                cell.textContent = currentPlayer;
                if (checkWin(currentPlayer)) {
                    highlightWinningCells(currentPlayer);
                    gameActive = false; // Set gameActive to false when someone wins
                    updatePlayerTurn();
                    return;
                }
                currentPlayer = 'O';
                updatePlayerTurn();
                if (mode === 'computer' && gameActive) {
                    // If playing against the computer, make the computer's move
                    makeComputerMove();
                }
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

    restartBtn.addEventListener('click', restart);

    function restart() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-box-x', 'winning-box-o');
        });
        gameActive = true; // Reset gameActive to true when restarting
        currentPlayer = Math.random() < 0.5 ? 'X' : 'O'; // Randomly select X or O for the first player
        updatePlayerTurn();
        if (mode === 'computer' && currentPlayer === 'O') {
            // If playing against the computer and the computer is the first player, make its move
            makeComputerMove();
        }
    }

    function makeComputerMove() {
        // Implement the logic for the computer's move here
        // For simplicity, you can randomly select an empty cell and mark it with 'O'
        const emptyCells = [...cells].filter(cell => !cell.textContent);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            emptyCells[randomIndex].textContent = 'O';
            if (checkWin('O')) {
                highlightWinningCells('O');
                gameActive = false;
                updatePlayerTurn();
            } else {
                currentPlayer = 'X';
                updatePlayerTurn();
            }
        }
    }

    // Initial setup
    updatePlayerTurn();
}

function goToHome() {
    window.location.href = 'index.html';
}

// Call the initialization function for computer mode
initComputerMode();
