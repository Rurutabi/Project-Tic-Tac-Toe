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

  const _resetPlayerTurn = function () {
    playerTurn = true;
  };

  const _winCondtion = function () {
    //Checking row
    for (let i = 0; i < 3; i++) {
      if (
        (gameBoard[i][0] === "X" || gameBoard[i][0] === "O") &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][1] === gameBoard[i][2]
      ) {
        console.log("Row, We have a winner");
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        (gameBoard[0][i] === "X" || gameBoard[0][i] === "O") &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[1][i] === gameBoard[2][i]
      ) {
        console.log("Column, We have a winner");
      }
    }

    if (
      (gameBoard[0][0] === "X" || gameBoard[0][0] === "O") &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
    ) {
      console.log("Diagonal 0-0, We have a winner");
    }

    if (
      (gameBoard[2][0] === "X" || gameBoard[2][0] === "O") &&
      gameBoard[2][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[0][2]
    ) {
      console.log("Diagonal 2-0, We have a winner");
    }

    // if (gameBoard.flat().every((value) => value !== "")) {
    //   console.log("Drawn");
    // }
  };

  // const _checkWinner = function () {
  //   if (_winCondtion() === true) {
  //     console.log("we have a winner");
  //   }
  // };

  const _clickValue = function () {
    allGrid.forEach((grid, index) => {
      grid.addEventListener("click", () => {
        if (grid.textContent === "") {
          if (playerTurn === true) {
            grid.textContent = "X";
            _updateArray(grid, index);
            _winCondtion();
            console.log(gameBoard);
            playerTurn = false;
          } else if (playerTurn === false) {
            grid.textContent = "O";
            _updateArray(grid, index);
            _winCondtion();
            playerTurn = true;
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
    _winCondtion,
    _resetPlayerTurn,
  };
})();

const optionModule = (() => {
  const restart = document.querySelector(".restart-btn");

  const _restart = () => {
    restart.addEventListener("click", () => {
      gridModule.allGrid.forEach((value) => (value.textContent = ""));
      gridModule._resetPlayerTurn();
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
// gridModule.gameBoard[0][0];
// console.log(gridModule.gameBoard[1][0]);
