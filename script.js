document.addEventListener("DOMContentLoaded", function () {
  let images = ["6.png", "6.png", "9.png", "9.png", "12.png", "12.png", "15.png", "15.png", "17.png", "17.png", "18.png", "18.png"];
  let cards = [];
  let flippedCards = [];
  let gameBoardClicksDisabled = true;

  const gameBoard = document.getElementById("game-board");
  const levelSelect = document.getElementById("level");

  levelSelect.addEventListener("change", changeLevel);
  document.getElementById("start").addEventListener("click", start);
  document.getElementById("reset").addEventListener("click", reset);

  changeLevel();

  function changeLevel() {
    //if (gameBoardClicksDisabled) return;

    const level = document.querySelector('input[name="level"]:checked').value;
    console.log("level: " + level);

    let numOfCards = 0;
    let numOfColumns = 0;
    switch (level) {
      case "easy":
        numOfCards = 6;
        numOfColumns = 3;
        break;
      case "medium":
        numOfCards = 8;
        numOfColumns = 4;
        break;
      case "hard":
        numOfCards = 12;
        numOfColumns = 4;
        break;
      default:
        console.error("unknown level: " + level);
    }

    gameBoard.innerHTML = "";
    cards = [];

    const cardSize = 150;

    gameBoard.style.width = `${cardSize * numOfColumns + 10}px`;

    const selectedImages = images.slice(0, numOfCards);
    selectedImages.sort(() => 0.5 - Math.random());

    for (let i = 0; i < numOfCards; i++) {
      const card = document.createElement("div");

      card.innerHTML = `<div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="images/front.webp" alt="front" style="width:${cardSize}px;height:${cardSize}px;"/>
                </div>
                <div class="flip-card-back">
                    <img src="images/${selectedImages[i]}" alt="back" style="width:${cardSize}px;height:${cardSize}px;"/>
                </div>
            </div>`;

      card.className = "flip-card";
      card.dataset.image = selectedImages[i];
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
      cards.push(card);
    }
  }

  function start() {
    console.log("start");
    gameBoardClicksDisabled = false;
    //document.getElementById("status").innerHTML = "Status: started";
  }

  function reset() {
    console.log("reset");    
    changeLevel();
    gameBoardClicksDisabled = true;
    //document.getElementById("status").innerHTML = "Status: stopped";
  }

  function flipCard() {
    if (gameBoardClicksDisabled) return;

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
      }
    }

    if (cards.every((card) => card.dataset.solved === "true")) {
      setTimeout(() => alert("Congratulations! You won!"), 500);
    }
  }
});
