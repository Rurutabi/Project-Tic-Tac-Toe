const gridModule = (() => {
  const allGrid = document.querySelectorAll(".grid-item");
  let player1Turn = true;
  let player2Turn = false;

  const _clickValue = function () {
    allGrid.forEach((grid) => {
      grid.addEventListener("click", () => {
        if (grid.textContent === "") {
          if (player1Turn === true) {
            grid.textContent = "X";
            player1Turn = false;
            player2Turn = true;
          } else if (player2Turn === true) {
            grid.textContent = "O";
            player1Turn = true;
            player2Turn = false;
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
    });
  };

  return {
    testExample,
    _restart,
  };
})();

gridModule._clickValue();
optionModule._restart();
// console.log(optionModule.testExample);
