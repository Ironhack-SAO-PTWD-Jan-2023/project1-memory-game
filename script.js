console.log('js conenctado!');
const gameBoard = document.querySelector('#game-board');

class Game {
  constructor() {
    this.boardSize = 6;
    this.defaultPositions = [1, 1, 2, 2, 3, 3];
    this.positions = [];
    this.guessed = [];
    this.clickedCards = [];
  }
  generateBoard() {
    for (let i = 0; i < this.boardSize; i += 1) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.addEventListener('click', () => {
        this.flipCard(card, i);
        
        if(this.clickedCards.length < 2) return;
        setTimeout(this.checkTurn, 1500);
      })
      gameBoard.appendChild(card);
    }
  }
  randomizePositions() {
    for (let i = 0; i < this.boardSize; i += 1) {
      const randomIndex = Math.floor(Math.random() * this.defaultPositions.length);
      const randomElement = this.defaultPositions[randomIndex];
      this.positions.push(randomElement);
      this.defaultPositions.splice(randomIndex, 1);
    }
  }
  flipCard (card, i) {
    if(this.clickedCards.length >= 2) return;
    if(card.classList.contains('flipped-card')) return;
    console.log(`Clicou no card ${i} com o conteúdo ${this.positions[i]}`)
    card.classList.add('flipped-card');
    const img = document.createElement('img');
    img.src = `./images/${this.positions[i]}.jpg`;
    card.appendChild(img);
    this.clickedCards.push({element: card, content: this.positions[i]});
  }
  checkTurn = () => {
    console.log('check turn');
    const card0 = this.clickedCards[0];
    const card1 = this.clickedCards[1];
    this.clickedCards = [];
    if (card0.content !== card1.content) {
      card0.element.classList.remove('flipped-card');
      card1.element.classList.remove('flipped-card');
      card0.element.innerHTML = '';
      card1.element.innerHTML = '';
    } else {
      this.guessed.push(card0.content);
    }
    this.checkWin();
  }
  checkWin () {
    console.log('ganhou?')
    if (this.guessed.length === this.boardSize / 2) {
      window.alert('Você ganhou!');
    }
  }
}

const game = new Game();
game.randomizePositions();
game.generateBoard();