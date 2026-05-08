
const startBtn = document.getElementById('start-btn');
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
  "Ciao! Sono Dario, laureato in ingegneria Informatica e appassionato di calcio!",

  "Da 3 anni sono Data Analyst, istruttore e allenatore di calcio, oltre che Referee Manager per la mia squadra in Eccellenza!",

  "Sono un ragazzo creativo e intraprendente, pronto a cogliere ogni opportunità nel mondo del calcio.",

  "Amo lavorare in team e sviluppare idee anche controintuitive.",

  "Complimenti per i gol! Se vuoi sapere di più ecco i miei contatti!"
];

startBtn.addEventListener('click', () => {
  startScreen.classList.remove('active');
  gameScreen.classList.add('active');
});
const targets = document.querySelectorAll('.target');
const goal = document.querySelector('.goal');

targets.forEach(target => {

  target.addEventListener('click', () => {

    const x = target.dataset.x;
    const y = target.dataset.y;

    const randomMove = Math.random() > 0.5 ? '-120px' : '120px';

    goalkeeper.style.transform = `translateX(${randomMove})`;

    ball.style.transition = 'all 0.7s ease';

    ball.style.transform =
      `translate(${x}px, ${y}px) scale(0.7)`;

    goal.classList.add('animate-net');

    setTimeout(() => {

      messageText.innerText = messages[currentShot];

      messageCard.classList.remove('hidden');

    }, 700);

  });

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

  ball.style.transform =
'translateX(-50%)';
  goal.classList.remove('animate-net');

  goalkeeper.style.transform = 'translateX(-50%)';


});
