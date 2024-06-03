document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  const timerElement = document.getElementById('timer');
  const bestTimeElement = document.getElementById('best-time');
  const resultMessage = document.getElementById('result-message');
  const gameContainer = document.getElementById('game-container');
  const resultContainer = document.getElementById('result-container');
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const boardSizeSelect = document.getElementById('board-size');
  let startTime, timerInterval, bestTime = localStorage.getItem('bestTime') || '--:--';

  bestTimeElement.textContent = bestTime;

  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', () => {
      gameContainer.classList.add('hidden');
      resultContainer.classList.add('hidden');
      document.getElementById('settings').classList.remove('hidden');
  });

  function startGame() {
      const size = parseInt(boardSizeSelect.value);
      const totalCards = size * size;
      const animalImages = [
          'animal1.png', 'animal2.png', 'animal3.png', 'animal4.png',
          'animal5.png', 'animal6.png', 'animal7.png', 'animal8.png',
          'animal9.png', 'animal10.png', 'animal11.png', 'animal12.png',
          'animal13.png', 'animal14.png', 'animal15.png', 'animal16.png',
          'animal17.png', 'animal18.png',
      ];

      let selectedImages = animalImages.slice(0, totalCards / 2);
      selectedImages = selectedImages.concat(selectedImages);
      selectedImages.sort(() => 0.5 - Math.random());

      board.innerHTML = '';
      board.style.gridTemplateColumns = `repeat(${size}, 100px)`;
      board.style.gridTemplateRows = `repeat(${size}, 100px)`;

      selectedImages.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = img;
        card.innerHTML = `
            <div class="front"><img src="../../assets/images/memory-game/card.png" alt="Card Back"></div>
            <div class="back"><img src="../../assets/images/memory-game/${img}" alt="Animal Image"></div>
        `;
        board.appendChild(card);
    });

      [firstCard, secondCard] = [null, null];
      lockBoard = false;

      document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));

      document.getElementById('settings').classList.add('hidden');
      gameContainer.classList.remove('hidden');
      startTime = new Date();
      clearInterval(timerInterval);
      timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
      const now = new Date();
      const elapsed = Math.floor((now - startTime) / 1000);
      const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const seconds = String(elapsed % 60).padStart(2, '0');
      timerElement.textContent = `${minutes}:${seconds}`;
  }

  function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add('flip');

      if (!firstCard) {
          firstCard = this;
          return;
      }

      secondCard = this;
      lockBoard = true;

      checkForMatch();
  }

  function checkForMatch() {
      if (firstCard.dataset.image === secondCard.dataset.image) {
          disableCards();
          if (document.querySelectorAll('.card:not(.flip)').length === 0) {
              gameOver();
          }
      } else {
          unflipCards();
      }
  }

  function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      resetBoard();
  }

  function unflipCards() {
      setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          resetBoard();
      }, 1500);
  }

  function resetBoard() {
      [firstCard, secondCard] = [null, null];
      lockBoard = false;
  }

  function gameOver() {
      clearInterval(timerInterval);
      const time = timerElement.textContent;
      resultMessage.textContent = `Congratulations! You completed the game in ${time}.`;

      if (bestTime === '--:--' || time < bestTime) {
          bestTime = time;
          bestTimeElement.textContent = bestTime;
          localStorage.setItem('bestTime', bestTime);
          resultMessage.textContent += ' New record!';
      }

      gameContainer.classList.add('hidden');
      resultContainer.classList.remove('hidden');
  }
});
