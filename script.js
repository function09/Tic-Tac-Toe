const gameBoard = (() => {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  return { gameBoardArray };
})();

const playerFactory = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};

const player1 = playerFactory("john", "x");

const gameFlow = (() => {})();

const getDOM = (() => {
  const selectSquares = () => document.querySelectorAll(".square");

  const addMarker = () => {
    selectSquares().forEach((square) => {
      square.addEventListener("click", () => {
        const selectIndex = Number(square.dataset.index);

        if (gameBoard.gameBoardArray[selectIndex] === "") {
          gameBoard.gameBoardArray.splice(selectIndex, 1, player1.getMarker());
        } else {
          return;
        }
        square.textContent = gameBoard.gameBoardArray[selectIndex];
      });
    });
  };
  return { addMarker };
})();

getDOM.addMarker();
