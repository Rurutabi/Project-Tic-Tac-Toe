const gridModule = (() => {
  const updateTurn = document.querySelector(".turn");
  const allGrid = document.querySelectorAll(".grid-item");
  const gameMode = document.getElementById("game-mode");
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let playerTurn = true;
  let winner = false;
  let draw = false;

  const _displayPlayer = function () {
    if (winner === false && draw === false) {
      if (playerTurn === true) {
        updateTurn.textContent = "This is player X's turn";
      } else if (playerTurn === false) {
        updateTurn.textContent = "This is player O's turn";
      }
    } else if (winner === true) {
      if (playerTurn === true) {
        updateTurn.textContent = "O is a Winner!";
      } else if (playerTurn === false) {
        updateTurn.textContent = "X is a Winner!";
      }
    } else if (winner === false && draw === true) {
      updateTurn.textContent = "It's a draw!";
    }
  };

  const _displayPc = function () {
    if (winner === false && draw === false) {
      if (playerTurn === false) {
        updateTurn.textContent = "This is player X's turn";
      } else if (playerTurn === true) {
        updateTurn.textContent = "This is player O's turn";
      }
    } else if (winner === true) {
      if (playerTurn === false) {
        updateTurn.textContent = "O is a Winner!";
      } else if (playerTurn === true) {
        updateTurn.textContent = "X is a Winner!";
      }
    } else if (winner === false && draw === true) {
      updateTurn.textContent = "It's a draw!";
    }
  };

  const _updateArray = function (grid, index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    gameBoard[row][col] = grid.textContent;
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

    _gameDraw();
  };

  const _gameDraw = function () {
    if (gameBoard.flat().every((value) => value !== "")) {
      draw = true;
    }
  };

  const _handlePlayer = function (grid, index) {
    _updateArray(grid, index);
    _winCondtion();
    if (gameMode.value === "Player-vs-Player") {
      _displayPlayer();
    } else {
      _displayPc();
    }
  };

  const _clickValue = function () {
    allGrid.forEach((grid, index) => {
      grid.addEventListener("click", () => {
        let randomNumber = Math.trunc(Math.random() * 8);
        if (gameMode.value === "Player-vs-Player") {
          if (winner === false) {
            if (grid.textContent === "") {
              if (playerTurn === true) {
                playerTurn = false;
                grid.textContent = "X";
                _handlePlayer(grid, index);
              } else if (playerTurn === false) {
                playerTurn = true;
                grid.textContent = "O";
                _handlePlayer(grid, index);
              }
            } else if (grid.textContent === "X" || grid.textContent === "O") {
              console.log("spot taken mate");
            }
          }
        } else if (gameMode.value === "Easy") {
          if (winner === false) {
            if (grid.textContent === "" && playerTurn === true) {
              grid.textContent = "X";
              _handlePlayer(grid, index);
              playerTurn = false;
              setTimeout(function () {
                if (draw === false && winner === false) {
                  console.log("still working");
                  while (
                    allGrid[randomNumber].textContent === "X" ||
                    allGrid[randomNumber].textContent === "O"
                  ) {
                    randomNumber = Math.trunc(Math.random() * 8);
                  }
                  let example = allGrid[randomNumber];
                  example.textContent = "O";
                  _handlePlayer(example, randomNumber);
                  playerTurn = true;
                }
              }, 500);
            }
          }
        }
      });
    });
  };

  const resetValue = function () {
    playerTurn = true;
    winner = false;
    draw = false;
    updateTurn.textContent = "This is player X's turn";
  };

  return {
    allGrid,
    _clickValue,
    gameBoard,
    _winCondtion,
    resetValue,
    _displayPlayer,
    _handlePlayer,
  };
})();

const restartModule = (() => {
  const restart = document.querySelector(".restart-btn");
  const gameRestart = document.getElementById("game-mode");

  const _reset = function () {
    gridModule.allGrid.forEach((value) => (value.textContent = ""));
    gridModule.resetValue();
    gridModule.gameBoard.forEach((value) => value.fill(""));
  };

  const _restart = () => {
    restart.addEventListener("click", () => {
      _reset();
    });

    gameRestart.addEventListener("change", () => {
      _reset();
    });
  };

  return {
    _restart,
  };
})();

gridModule._clickValue();
restartModule._restart();
gridModule._displayPlayer();
