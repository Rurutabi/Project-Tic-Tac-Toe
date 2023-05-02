const gridModule = (() => {
  const allGrid = document.querySelectorAll(".grid-item");
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let playerTurn = true;
  // let player2Turn = false;

  const _updateArray = function (grid, index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    gameBoard[row][col] = grid.textContent;
  };

  const _clickValue = function () {
    allGrid.forEach((grid, index) => {
      grid.addEventListener("click", () => {
        if (grid.textContent === "") {
          if (playerTurn === true) {
            grid.textContent = "X";
            _updateArray(grid, index);
            playerTurn = false;
            console.log(gameBoard);
          } else if (playerTurn === false) {
            grid.textContent = "O";
            _updateArray(grid, index);
            playerTurn = true;
            console.log(gameBoard);
          }
        } else if (grid.textContent === "X" || grid.textContent === "O") {
          console.log("spot taken mate");
        }
      });
    });
  };

  return {
    allGrid,
    _clickValue,
    gameBoard,
  };
})();

const optionModule = (() => {
  const restart = document.querySelector(".restart-btn");
  const testExample = gridModule.allGrid;

  const _restart = () => {
    restart.addEventListener("click", () => {
      gridModule.allGrid.forEach((value) => (value.textContent = ""));
      player1Turn = true;
      player2Turn = false;
      gridModule.gameBoard.forEach((value) => value.fill(""));
    });
  };

  return {
    testExample,
    _restart,
  };
})();

gridModule._clickValue();
optionModule._restart();
// console.log(gridModule.gameBoard);
