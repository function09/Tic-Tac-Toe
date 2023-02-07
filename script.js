const gameBoard = (() => {
  const gameBoardArray = Array(9).fill("");
  return { gameBoardArray };
})();

const playerFactory = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

const createDisplay = (() => {
  const selectRestartButton = document.querySelector("#restart");
  const selectContainer = document.querySelector(".container");
  const createDiv = document.createElement("div");
  createDiv.classList.add("playerDisplay");
  selectContainer.appendChild(createDiv);

  const player1Turn = () => {
    createDiv.textContent = "Player 1's turn";
    return createDiv.textContent;
  };
  const player2Turn = () => {
    createDiv.textContent = "Player 2's turn";
    return createDiv.textContent;
  };
  const player1Winner = () => {
    createDiv.textContent = "Player 1 wins!";
    return createDiv.textContent;
  };
  const player2Winner = () => {
    createDiv.textContent = "Player 2 wins!";
    return createDiv.textContent;
  };
  const drawGame = () => {
    createDiv.textContent = "It's a draw!";
    return createDiv.textContent;
  };

  const restartGame = () => {
    selectRestartButton.style.display = "block";
  };

  return {
    createDiv,
    player1Turn,
    player2Turn,
    player1Winner,
    player2Winner,
    drawGame,
    restartGame,
  };
})();

const gameFlow = (() => {
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  let currentPlayer = player2;
  let isPlaying = true;
  let isWinner;

  const takeTurns = () => {
    if (currentPlayer === player2) {
      currentPlayer = player1;
      createDisplay.player2Turn();
    } else {
      currentPlayer = player2;
      createDisplay.player1Turn();
    }
    return currentPlayer.getMarker();
  };
  return { takeTurns, isPlaying, isWinner };
})();

const checkWinAndDraw = (() => {
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
        createDisplay.player1Winner();
        gameFlow.isPlaying = false;
        gameFlow.isWinner = true;
        createDisplay.restartGame();
      } else if (winningCombinations[i].every(player2Winner)) {
        createDisplay.player2Winner();
        gameFlow.isPlaying = false;
        gameFlow.isWinner = true;
        createDisplay.restartGame();
      }
    }
  };
  const checkDraw = () => {
    if (
      getGameBoardArray.every((i) => i !== "") &&
      gameFlow.isWinner !== true
    ) {
      createDisplay.drawGame();
      createDisplay.restartGame();
    }
  };
  return { checkWin, checkDraw };
})();

const getEventListener = (() => {
  const selectSquares = () => document.querySelectorAll(".square");
  const selectButtons = () => document.querySelectorAll("button");
  const selectStartGame = document.querySelector("#startGame");
  const selectRestart = document.querySelector("#restart");

  const addMarker = () => {
    selectSquares().forEach((square) => {
      square.addEventListener("click", () => {
        const selectIndex = Number(square.dataset.index);
        if (
          gameBoard.gameBoardArray[selectIndex] === "" &&
          gameFlow.isPlaying === true
        ) {
          gameBoard.gameBoardArray.splice(selectIndex, 1, gameFlow.takeTurns());
          if (gameFlow.isPlaying === false) {
            return;
          }
        } else if (gameBoard.gameBoardArray[selectIndex] !== "") {
          return;
        }
        square.textContent = gameBoard.gameBoardArray[selectIndex];
        checkWinAndDraw.checkWin();
        checkWinAndDraw.checkDraw();
      });
    });
  };
  const gameButtons = () => {
    selectButtons().forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.target.id === "startGame") {
          addMarker();
          createDisplay.player1Turn();
          selectStartGame.style.display = "none";
        } else if (e.target.id === "restart") {
          gameBoard.gameBoardArray.fill("", 0);
          selectSquares().forEach((square) => {
            square.textContent = "";
          });
          gameFlow.isPlaying = true;
          gameFlow.isWinner = false;
          gameFlow.takeTurns();
          createDisplay.player1Turn();
          selectRestart.style.display = "none";
        }
      });
    });
  };
  return { addMarker, gameButtons };
})();

getEventListener.gameButtons();
