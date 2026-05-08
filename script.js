
const startBtn = document.getElementById('start-btn');
const shootBtn = document.getElementById('shoot-btn');
const nextBtn = document.getElementById('next-btn');

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const finalScreen = document.getElementById('final-screen');

const shotCounter = document.getElementById('shot-counter');
const ball = document.getElementById('ball');
const goalkeeper = document.querySelector('.goalkeeper');

const messageCard = document.getElementById('message-card');
const messageText = document.getElementById('message-text');

let currentShot = 0;

const messages = [
  "Ciao! Sono Dario, laureando in Ingegneria Informatica.",
  "Mi appassionano tecnologia, UX e progetti creativi.",
  "Amo trasformare idee semplici in esperienze interattive.",
  "Mi piace lavorare in team e imparare velocemente.",
  "Grazie per aver giocato. Vuoi conoscermi meglio?"
];

startBtn.addEventListener('click', () => {
  startScreen.classList.remove('active');
  gameScreen.classList.add('active');
});

shootBtn.addEventListener('click', () => {

  shootBtn.disabled = true;

  const randomMove = Math.random() > 0.5 ? '-80px' : '80px';
  goalkeeper.style.transform = `translateX(${randomMove})`;

  ball.classList.add('shoot');

  setTimeout(() => {
    messageText.innerText = messages[currentShot];
    messageCard.classList.remove('hidden');
  }, 700);
});

nextBtn.addEventListener('click', () => {

  currentShot++;

  if(currentShot >= messages.length) {
    gameScreen.classList.remove('active');
    finalScreen.classList.add('active');
    return;
  }

  shotCounter.innerText = `Rigore ${currentShot + 1}/5`;

  messageCard.classList.add('hidden');

  ball.classList.remove('shoot');

  goalkeeper.style.transform = 'translateX(-50%)';

  shootBtn.disabled = false;
});
