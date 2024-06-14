document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('popupOverlay');
    const board = document.getElementById('board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const gameStatus = document.getElementById('game-status');
    const resetBtn = document.getElementById('reset-btn');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = Array(9).fill('');

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Function for checking if the player has won the game
    function checkWin() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    }

    // Checking if there is a draw
    function checkDraw() {
        return boardState.every(cell => cell);
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (boardState[index] !== '' || !gameActive) {
            return;
        }

        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            gameStatus.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            gameStatus.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (currentPlayer === 'O') {
            setTimeout(computerMove, 5000); // 5 seconds delay
        }
    }

    function computerMove() {
        if (!gameActive) return;

        let availableIndices = [];
        boardState.forEach((cell, index) => {
            if (cell === '') availableIndices.push(index);
        });

        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        boardState[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;

        if (checkWin()) {
            gameStatus.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            gameStatus.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = 'X';
        gameActive = true;
        boardState = Array(9).fill('');
        gameStatus.textContent = '';
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetBtn.addEventListener('click', resetGame);

    window.submitForm = function() {
        const difficultySelect = document.getElementById('difficultySelect').value;
        const playAsSelect = document.getElementById('playAsSelect').value;
        currentPlayer = playAsSelect;
        popupOverlay.style.display = 'none';
        gameContainer.style.display = 'block';
        if (currentPlayer === 'O') {
            setTimeout(computerMove, 5000); // Computer starts if 'O' is selected
        }
    }
});
