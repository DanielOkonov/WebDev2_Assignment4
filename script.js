document.addEventListener("DOMContentLoaded", function() {

    let colors = ['yellow', 'yellow', 'green', 'green', 'blue', 'blue'];
    let cards = [];
    let cardElements = [];
    let flippedCards = [];
    let gameBoard = document.getElementById('game-board');

    colors.sort(() => 0.5 - Math.random());

    for(let i = 0; i < 6; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        card.dataset.color = colors[i];
        card.style.backgroundColor = 'grey';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
        cardElements.push(card);
    }

    function flipCard() {
        let color = this.dataset.color;

        this.style.backgroundColor = color;

        flippedCards.push(this);

        this.removeEventListener('click', flipCard);

        if(flippedCards.length === 2) {
            if(flippedCards[0].dataset.color !== flippedCards[1].dataset.color) {
                setTimeout(() => {
                    flippedCards[0].style.backgroundColor = 'grey';
                    flippedCards[1].style.backgroundColor = 'grey';
                    flippedCards[0].addEventListener('click', flipCard);
                    flippedCards[1].addEventListener('click', flipCard);
                    flippedCards = [];
                }, 1000);
            } else {
                flippedCards = [];
            }
        }

        if(!cards.some(card => card.style.backgroundColor === 'grey')) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
        }
    }
});
