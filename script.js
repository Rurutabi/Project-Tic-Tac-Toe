const gridModule = (() => {
  const allGrid = document.querySelectorAll(".grid-item");

  const _clickValue = function () {
    allGrid.forEach((value) => {
      value.addEventListener("click", () => {
        value.textContent = "X";
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
