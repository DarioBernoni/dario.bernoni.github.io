let locked = false;
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const finalScreen = document.getElementById("final-screen");

const targets = document.querySelectorAll(".target");
const ball = document.getElementById("ball");
const goalkeeper = document.querySelector(".goalkeeper");

const messageCard = document.getElementById("message-card");
const messageText = document.getElementById("message-text");
const nextBtn = document.getElementById("next-btn");
const shotCounter = document.getElementById("shot-counter");

const goal = document.querySelector(".goal");

let currentShot = 0;

const messages = [
  "Ciao! Sono Dario, laureato in ingegneria Informatica e appassionato di calcio!",
  "Da 3 anni sono Data Analyst, istruttore e allenatore di calcio, oltre che Referee Manager per la mia squadra in Eccellenza!",
  "Sono un ragazzo creativo e intraprendente, pronto a cogliere ogni opportunità nel mondo del calcio.",
  "Amo lavorare in team e sviluppare idee anche controintuitive.",
  "Complimenti per i gol! Se vuoi sapere di più ecco i miei contatti!"
];

startBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  gameScreen.classList.add("active");
});

targets.forEach(target => {

  target.addEventListener("click", () => {

    const rect = target.getBoundingClientRect();
    const parentRect = document.querySelector(".goal-area").getBoundingClientRect();

const x = rect.left + rect.width / 2 - parentRect.left;
const y = rect.top + rect.height / 2 - parentRect.top;

ball.style.left = x + "px";
ball.style.top = y + "px";
ball.style.transform = "translate(-50%, -50%)";
    
    goalkeeper.style.transform = "translateX(-40px)";

    ball.style.transform = `translate(${x}px, ${y}px)`;

    goal.classList.add("animate");

    setTimeout(() => {

      messageText.innerText = messages[currentShot];
      messageCard.classList.remove("hidden");

    }, 600);

  });

});

nextBtn.addEventListener("click", () => {

  currentShot++;

  if (currentShot >= messages.length) {

    gameScreen.classList.remove("active");
    finalScreen.classList.add("active");
    return;

  }

  shotCounter.innerText = `Rigore ${currentShot + 1}/5`;

  messageCard.classList.add("hidden");

  ball.style.transform = "translateX(-50%)";

  goal.classList.remove("animate");

  goalkeeper.style.transform = "translateX(-50%)";
});
