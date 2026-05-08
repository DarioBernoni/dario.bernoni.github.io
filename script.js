const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const finalScreen = document.getElementById("final-screen");

const targets = document.querySelectorAll(".target");
const ball = document.getElementById("ball");
const goalkeeper = document.querySelector(".goalkeeper");
const goal = document.querySelector(".goal");

const messageCard = document.getElementById("message-card");
const messageText = document.getElementById("message-text");
const nextBtn = document.getElementById("next-btn");
const shotCounter = document.getElementById("shot-counter");

let currentShot = 0;
let locked = false;

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

/* ===== EA SPORTS STYLE SHOT SYSTEM ===== */

targets.forEach(target => {

  target.addEventListener("click", (e) => {

    if (locked) return;
    locked = true;

    const rect = target.getBoundingClientRect();
    const container = document.querySelector(".goal-area").getBoundingClientRect();

    const x = rect.left + rect.width / 2 - container.left;
    const y = rect.top + rect.height / 2 - container.top;

    // portiere reaction random
    const move = (Math.random() - 0.5) * 120;
    goalkeeper.style.transform = `translateX(calc(-50% + ${move}px))`;

    // move ball EXACT position
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    ball.style.transform = "translate(-50%, -50%) scale(0.9)";

    // net animation
    goal.classList.add("animate");

    setTimeout(() => {

      messageText.innerText = messages[currentShot];
      messageCard.classList.remove("hidden");

    }, 450);

  });

});

nextBtn.addEventListener("click", () => {

  currentShot++;

  locked = false;

  if (currentShot >= messages.length) {
    gameScreen.classList.remove("active");
    finalScreen.classList.add("active");
    return;
  }

  shotCounter.innerText = `Rigore ${currentShot + 1}/5`;

  messageCard.classList.add("hidden");

  // reset ball
  ball.style.left = "50%";
  ball.style.top = "320px";
  ball.style.transform = "translate(-50%, -50%) scale(1)";

  // reset goalkeeper
  goalkeeper.style.transform = "translateX(-50%)";

  goal.classList.remove("animate");
});
