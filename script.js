const gameBoard = (() => {
  const gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  return { gameBoardArray };
})();

const playerFactory = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};

const gameFlow = (() => {
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  let currentPlayer = player2;

  const takeTurns = () => {
    if (currentPlayer === player2) {
      currentPlayer = player1;
    } else {
      currentPlayer = player2;
    }
    return currentPlayer.getMarker();
  };
  return { takeTurns };
})();

const getDOM = (() => {
  const selectSquares = () => document.querySelectorAll(".square");

  const addMarker = () => {
    selectSquares().forEach((square) => {
      square.addEventListener("click", () => {
        const selectIndex = Number(square.dataset.index);
        if (gameBoard.gameBoardArray[selectIndex] === "") {
          gameBoard.gameBoardArray.splice(selectIndex, 1, gameFlow.takeTurns());
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
