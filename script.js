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

const messages=[
"Ciao, sono Dario Bernoni. Ingegnere Informatico con una forte passione per il calcio e l'analisi dei dati.",
"Da oltre 3 anni lavoro tra Data Analysis, processi decisionali e supporto operativo nel mondo aziendale.",
"Sono allenatore FIGC, ex arbitro regionale e oggi Referee Manager in Eccellenza.",
"Mi piace trasformare dati, osservazioni e intuizioni in decisioni concrete e misurabili.",
"Hai completato il Penalty CV. Ora puoi scoprire il mio percorso professionale completo."
];

startBtn.addEventListener("click", () => {

startScreen.classList.remove("active");

setTimeout(() => {
gameScreen.classList.add("active");
}, 200);

});

function animateBall(targetX, targetY) {

const startX = document.querySelector(".goal-area").offsetWidth / 2;
const startY = 345;

const duration = 700;
const startTime = performance.now();

function frame(time) {

let progress = (time - startTime) / duration;

if (progress > 1) progress = 1;

const ease = 1 - Math.pow(1 - progress, 3);

const curve = Math.sin(progress * Math.PI) * 85;

const currentX =
startX + (targetX - startX) * ease;

const currentY =
startY + (targetY - startY) * ease - curve;

const scale = 1 - progress * .45;

ball.style.left = currentX + "px";
ball.style.top = currentY + "px";

ball.style.transform =
`translate(-50%,-50%) scale(${scale}) rotate(${progress * 540}deg)`;

if (progress < 1) {
requestAnimationFrame(frame);
}

}

requestAnimationFrame(frame);

}

function moveGoalkeeper(column) {

goalkeeper.classList.remove(
"left",
"right",
"center"
);

if (column === 0) {
goalkeeper.classList.add("left");
}
else if (column === 2) {
goalkeeper.classList.add("right");
}
else {
goalkeeper.classList.add("center");
}

}

targets.forEach((target,index)=>{

target.addEventListener("click",()=>{

if(locked) return;

locked = true;

const rect = target.getBoundingClientRect();

const container =
document.querySelector(".goal-area")
.getBoundingClientRect();

const x =
rect.left +
rect.width/2 -
container.left;

const y =
rect.top +
rect.height/2 -
container.top;

const column = index % 3;
const row = Math.floor(index / 3);

const isSaved = row === 1;

moveGoalkeeper(column);

if(!isSaved){
goal.classList.add("animate");
}

animateBall(x,y);

setTimeout(()=>{

let title = document.getElementById("result-title");

if(title){

title.innerHTML = isSaved
? "PARATA ❌"
: "GOOOL ⚽";

}

messageText.innerHTML =
messages[currentShot];

messageCard.classList.remove("hidden");

},750);

});

});

nextBtn.addEventListener("click",()=>{

currentShot++;

if(currentShot >= messages.length){

gameScreen.classList.remove("active");

setTimeout(()=>{
finalScreen.classList.add("active");
},250);

return;

}

locked = false;

shotCounter.innerText =
`Rigore ${currentShot + 1}/5`;

messageCard.classList.add("hidden");

goal.classList.remove("animate");

goalkeeper.classList.remove(
"left",
"right",
"center"
);

ball.style.left = "50%";
ball.style.top = "345px";

ball.style.transform =
"translate(-50%,-50%) scale(1) rotate(0deg)";

});
