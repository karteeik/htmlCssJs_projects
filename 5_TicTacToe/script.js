const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const statusMessage = document.getElementById("statusMessage");
const restartBtn = document.getElementById("restartBtn");

let isCircleTurn = false;
const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const startGame = () => {
  isCircleTurn = false;
  statusMessage.innerText = "Player X's Turn";

  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.textContent = ""; // 🔄 clear old X/O
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
};


const endGame = (draw) => {
  if (draw) {
    statusMessage.innerText = "Draw!";
  } else {
    statusMessage.innerText = `Player ${isCircleTurn ? "O" : "X"} Wins! 🎉`;
  }
};

const checkWin = (currentClass) => {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

const isDraw = () => {
  return [...cells].every(cell =>
    cell.classList.contains("x") || cell.classList.contains("o")
  );
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = isCircleTurn ? "o" : "x";
  
  // Add class for styling (optional)
  cell.classList.add(currentClass);
  
  // 🟢 THIS is what shows the X or O in the cell:
  cell.textContent = currentClass.toUpperCase();

  // Check for win or draw
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    isCircleTurn = !isCircleTurn;
    statusMessage.innerText = `Player ${isCircleTurn ? "O" : "X"}'s Turn`;
  }
};


restartBtn.addEventListener("click", startGame);

startGame(); // Start the game when page loads
