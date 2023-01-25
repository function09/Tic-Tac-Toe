const gameBoard = (() => {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  return { gameBoardArray };
})();

const playerFactory = (name, marker) => {
  const getName = name;
  const getMarker = marker;
  const selectSquares = document.querySelectorAll(".square");
  const selectGameBoardArray = gameBoard.gameBoardArray;

  const addMarker = selectSquares.forEach((square) => {
    square.addEventListener("click", () => {
      const selectIndex = Number(square.dataset.index);

      if (selectGameBoardArray[selectIndex] === "") {
        selectGameBoardArray.splice(selectIndex, 1, getMarker);
      } else {
        return;
      }
      square.textContent = selectGameBoardArray[selectIndex];
    });
  });
  return {};
};

const gameFlow = (() => {})();
