const gameBoard = (() => {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  const selectSquares = () => document.querySelectorAll(".square");
  return { gameBoardArray, selectSquares };
})();

const playerFactory = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  const getGameBoardArray = gameBoard.gameBoardArray;
  const getSquares = gameBoard.selectSquares();

  const addMarker = () => {
    getSquares.forEach((square) => {
      square.addEventListener("click", () => {
        const selectIndex = Number(square.dataset.index);

        if (getGameBoardArray[selectIndex] === "") {
          getGameBoardArray.splice(selectIndex, 1, getMarker());
        } else {
          return;
        }
        square.textContent = getGameBoardArray[selectIndex];
      });
    });
  };
  return { addMarker };
};

const gameFlow = (() => {})();
