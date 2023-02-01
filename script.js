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

const winConditions = (() => {
  const getGameBoardArray = gameBoard.gameBoardArray;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const checkWin = () => {
    const player1Winner = (element) => {
      const player1Wins = getGameBoardArray[element] === "X";

      return player1Wins;
    };

    const player2Winner = (element) => {
      const player2Wins = getGameBoardArray[element] === "O";

      return player2Wins;
    };
    for (let i = 0; i < winningCombinations.length; i++) {
      if (winningCombinations[i].every(player1Winner)) {
        console.log("Player1 wins!");
      } else if (winningCombinations[i].every(player2Winner)) {
        console.log("Player2 wins!");
      }
    }
  };

  return { checkWin };
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
        winConditions.checkWin();
      });
    });
  };
  return { addMarker };
})();

getDOM.addMarker();
