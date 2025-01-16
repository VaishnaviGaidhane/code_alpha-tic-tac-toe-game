const gameBoard = document.getElementById("gameBoard");
const cells = document.querySelectorAll(".cell");
const statusMessage = document.getElementById("statusMessage");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
const newGameButton = document.getElementById("newGameButton");
const gameContainer = document.getElementById("gameContainer");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showResultScreen(Player$ ,{currentPlayer}  Wins!);
        isGameActive = false;
        return true;
    }

    if (!boardState.includes("")) {
        showResultScreen("It's a Draw!");
        isGameActive = false;
        return true;
    }

    return false;
};

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (boardState[index] !== '' || !isGameActive) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = Player$ ,{currentPlayer},'s Turn;
};

const showResultScreen = (message) => {
    resultMessage.textContent = message;
    resultScreen.style.display = "flex";
    gameContainer.style.display = "none";
};

const resetGame = () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
    });
    currentPlayer = "X";
    isGameActive = true;
    resultScreen.style.display = "none";
    gameContainer.style.display = "block";
    statusMessage.textContent = PlayerX,'s Turn;
};

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
newGameButton.addEventListener("click", resetGame);