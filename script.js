document.addEventListener("DOMContentLoaded", function () {
  let images = [
    "6.png",   
    "9.png",    
    "12.png",    
    "15.png",    
    "17.png",    
    "18.png",
    "22.png",
    "24.png",
    "31.png",
    "34.png",
    "38.png",
    "42.png",
    "49.png",
    "59.png",
  ];
  let cards = [];
  let flippedCards = [];
  let gameBoardClicksDisabled = true;

  const gameLevelDetails = {
    numOfCardPairs: 0,
    numOfColumns: 0,
    secondsToDoAll: 0,
  };
  const gameStatus = {
    gameOn: false,
    numOfCardPairsDone: 0,
    numOfCllcks: 0,
    secondsRemaining: 0,
  };

  const gameBoard = document.getElementById("game-board");
  const levelSelect = document.getElementById("level");

  levelSelect.addEventListener("change", changeLevel);
  document.getElementById("start").addEventListener("click", start);
  document.getElementById("reset").addEventListener("click", reset);

  setInterval(decrementSeconds, 1000);

  changeLevel();

  function changeLevel() {
    if (gameStatus.gameOn) return;

    const level = document.querySelector('input[name="level"]:checked').value;
    console.log("level: " + level);

    switch (level) {
      case "easy":
        gameLevelDetails.numOfCardPairs = 3;
        gameLevelDetails.numOfColumns = 3;
        gameLevelDetails.secondsToDoAll = 30;
        break;
      case "medium":
        gameLevelDetails.numOfCardPairs = 4;
        gameLevelDetails.numOfColumns = 4;
        gameLevelDetails.secondsToDoAll = 60;
        break;
      case "hard":
        gameLevelDetails.numOfCardPairs = 6;
        gameLevelDetails.numOfColumns = 4;
        gameLevelDetails.secondsToDoAll = 90;
        break;
      default:
        console.error("unknown level: " + level);
    }

    document.getElementById(
      "numOfCardPairs"
    ).innerHTML = `Number of card pairs: ${gameLevelDetails.numOfCardPairs}`;

    gameBoard.innerHTML = "";
    cards = [];

    gameStatus.gameOn = false;
    gameStatus.numOfCardPairsDone = 0;
    gameStatus.numOfCllcks = 0;
    gameStatus.secondsRemaining = gameLevelDetails.secondsToDoAll;

    updateGameStatus();

    const cardSize = 150;

    gameBoard.style.width = `${
      cardSize * gameLevelDetails.numOfColumns + 10
    }px`;

    images.sort(() => 0.5 - Math.random());
    const selectedImages = images.slice(0, gameLevelDetails.numOfCardPairs);
    const imagesToAdd = [];
    selectedImages.forEach(si => {
      imagesToAdd.push(si);
      imagesToAdd.push(si);
    })
    imagesToAdd.sort(() => 0.5 - Math.random());

    for (let i = 0; i < gameLevelDetails.numOfCardPairs * 2; i++) {
      const card = document.createElement("div");

      card.innerHTML = `<div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="images/front.webp" alt="front" style="width:${cardSize}px;height:${cardSize}px;"/>
                </div>
                <div class="flip-card-back">
                    <img src="images/${imagesToAdd[i]}" alt="back" style="width:${cardSize}px;height:${cardSize}px;"/>
                </div>
            </div>`;

      card.className = "flip-card";
      card.dataset.image = imagesToAdd[i];
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
      cards.push(card);
    }
  }

  function start() {
    console.log("start");
    gameBoardClicksDisabled = false;
    gameStatus.gameOn = true;
    updateGameStatus();    
  }

  function reset() {
    console.log("reset");
    changeLevel();
    gameBoardClicksDisabled = true;
    gameStatus.gameOn = false;
    gameStatus.secondsRemaining = gameLevelDetails.secondsToDoAll;
    updateGameStatus();
  }

  function flipCard() {
    if (gameBoardClicksDisabled) return;

    gameStatus.numOfCllcks++;

    this.classList.add("flip-card-flipped");

    flippedCards.push(this);

    this.removeEventListener("click", flipCard);

    if (flippedCards.length === 2) {
      if (flippedCards[0].dataset.image !== flippedCards[1].dataset.image) {
        gameBoardClicksDisabled = true;
        setTimeout(() => {
          flippedCards[0].classList.remove("flip-card-flipped");
          flippedCards[1].classList.remove("flip-card-flipped");
          flippedCards[0].addEventListener("click", flipCard);
          flippedCards[1].addEventListener("click", flipCard);
          flippedCards = [];
          gameBoardClicksDisabled = false;
        }, 1000);
      } else {
        flippedCards[0].dataset.solved = "true";
        flippedCards[1].dataset.solved = "true";
        flippedCards = [];
        gameStatus.numOfCardPairsDone++;
      }
    }

    if (cards.every((card) => card.dataset.solved === "true")) {
      gameStatus.gameOn = false;      
      setTimeout(() => alert("Congratulations! You won!"), 500);
    }

    updateGameStatus();
  }

  function updateGameStatus() {
    if (gameStatus.gameOn) {
      document.getElementById("gameOn").style.visibility = "visible";
      document.getElementsByName('level').forEach(l => l.disabled = true);
    } else {
      document.getElementById("gameOn").style.visibility = "hidden";
      document.getElementsByName('level').forEach(l => l.disabled = false);
    }

    document.getElementById(
      "numOfCardPairsDone"
    ).innerHTML = `Number of card pairs done: ${gameStatus.numOfCardPairsDone}`;

    document.getElementById(
      "numOfCardPairsToDo"
    ).innerHTML = `Number of card pairs to do: ${gameLevelDetails.numOfCardPairs - gameStatus.numOfCardPairsDone}`;

    document.getElementById(
      "numOfCllcks"
    ).innerHTML = `Number of clicks: ${gameStatus.numOfCllcks}`;

    document.getElementById(
      "secondsRemaining"
    ).innerHTML = `Seconds remaining: ${gameStatus.secondsRemaining}`;
  }

  function decrementSeconds(){
    if(!gameStatus.gameOn) return;

    gameStatus.secondsRemaining--;

    document.getElementById(
      "secondsRemaining"
    ).innerHTML = `Seconds remaining: ${gameStatus.secondsRemaining}`;

    if (gameStatus.secondsRemaining === 0) {
      gameStatus.gameOn = false;      
      setTimeout(() => alert("Sorry, You lost"), 500);
    }
  }

});
