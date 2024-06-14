document.addEventListener('DOMContentLoaded', () => {
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

    function checkWin() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return true;
            }
        }
        return false;
    }

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
    }

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
});
