const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);

// Create the board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
}

function handleMove(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    // Check if cell is already taken
    if (boardState[index] || !isPlayerTurn()) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    // Send move to server
    sendMoveToServer(index);

    // Check for winner
    const winner = checkWinner();
    if (winner) {
        status.textContent = `Player ${winner} wins!`;
        board.removeEventListener('click', handleMove);
    } else if (boardState.every(cell => cell)) {
        status.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6],           // Diagonals
    ];
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function updateStatus() {
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Placeholder for server communication
function isPlayerTurn() {
    // Logic to ensure moves only happen when it's the user's turn
    return true;
}

function sendMoveToServer(index) {
    // Send the move to the server to update the game state
    console.log(`Player ${currentPlayer} moved to position ${index}`);
}
