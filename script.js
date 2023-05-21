document.addEventListener("DOMContentLoaded", function() {

    let images = ['6.png', '6.png', '9.png', '9.png', '12.png', '12.png'];
    let cards = [];
    let flippedCards = [];
    let gameBoard = document.getElementById('game-board');

    images.sort(() => 0.5 - Math.random());

    for(let i = 0; i < 6; i++) {
        let card = document.createElement('div');

        card.innerHTML = 
            `<div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="images/front.webp" alt="front" style="width:100px;height:100px;"/>
                </div>
                <div class="flip-card-back">
                    <img src="images/${images[i]}" alt="back" style="width:100px;height:100px;"/>
                </div>
            </div>`;

        card.className = 'flip-card';
        card.dataset.image = images[i];
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }

    function flipCard() {
        this.classList.add("flip-card-flipped");

        flippedCards.push(this);

        this.removeEventListener('click', flipCard);

        if(flippedCards.length === 2) {
            if(flippedCards[0].dataset.image !== flippedCards[1].dataset.image) {
                setTimeout(() => {
                    flippedCards[0].classList.remove("flip-card-flipped");
                    flippedCards[1].classList.remove("flip-card-flipped");
                    flippedCards[0].addEventListener('click', flipCard);
                    flippedCards[1].addEventListener('click', flipCard);
                    flippedCards = [];
                }, 1000);
            } else {
                flippedCards = [];
            }
        }

        if(cards.every(card => card.classList.contains('flip-card-flipped'))) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    }
});
