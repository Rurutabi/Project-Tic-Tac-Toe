const gridModule = (() => {
  const updateTurn = document.querySelector(".turn");
  const allGrid = document.querySelectorAll(".grid-item");
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let playerTurn = true;
  let winner = false;
  let draw = false;

  const _displayPlayerTurn = function () {
    if (winner === false && draw === false) {
      if (playerTurn === true) {
        updateTurn.textContent = "This is player X's turn";
      } else if (playerTurn === false) {
        updateTurn.textContent = "This is player O's turn";
      }
    } else if (winner === true) {
      updateTurn.textContent = "Look like we have a Winner!";
    } else if (winner === false && draw === true) {
      updateTurn.textContent = "It's a draw!";
    }
  };

  const _updateArray = function (grid, index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    gameBoard[row][col] = grid.textContent;
  };

  const resetValue = function () {
    playerTurn = true;
    winner = false;
    updateTurn.textContent = "This is player X's turn";
  };

  const _winCondtion = function () {
    //Checking row
    for (let i = 0; i < 3; i++) {
      if (
        (gameBoard[i][0] === "X" || gameBoard[i][0] === "O") &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2]
      ) {
        winner = true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        (gameBoard[0][i] === "X" || gameBoard[0][i] === "O") &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
      ) {
        winner = true;
      }
    }

    if (
      (gameBoard[0][0] === "X" || gameBoard[0][0] === "O") &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
    ) {
      winner = true;
    }

    if (
      (gameBoard[2][0] === "X" || gameBoard[2][0] === "O") &&
      gameBoard[2][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[0][2]
    ) {
      winner = true;
    }

    if (gameBoard.flat().every((value) => value !== "")) {
      draw = true;
    }
  };

  const _handleGridClick = function (grid, index) {
    _updateArray(grid, index);
    _winCondtion();
    _displayPlayerTurn();
    console.log(gameBoard);
  };

  const _clickValue = function () {
    allGrid.forEach((grid, index) => {
      grid.addEventListener("click", () => {
        if (winner === false) {
          if (grid.textContent === "") {
            if (playerTurn === true) {
              playerTurn = false;
              grid.textContent = "X";
              _handleGridClick(grid, index);
            } else if (playerTurn === false) {
              playerTurn = true;
              grid.textContent = "O";
              _handleGridClick(grid, index);
            }
          } else if (grid.textContent === "X" || grid.textContent === "O") {
            console.log("spot taken mate");
          }
        }
      });
    });
  };

  return {
    allGrid,
    _clickValue,
    gameBoard,
    _winCondtion,
    resetValue,
    _displayPlayerTurn,
    _handleGridClick,
  };
})();

const optionModule = (() => {
  const restart = document.querySelector(".restart-btn");

  const _restart = () => {
    restart.addEventListener("click", () => {
      gridModule.allGrid.forEach((value) => (value.textContent = ""));
      gridModule.resetValue();
      gridModule.gameBoard.forEach((value) => value.fill(""));
    });
  };

  return {
    _restart,
  };
})();

gridModule._clickValue();
optionModule._restart();
gridModule._winCondtion();
gridModule._displayPlayerTurn();
