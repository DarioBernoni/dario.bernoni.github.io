const startBtn=document.getElementById("start-btn");
const startScreen=document.getElementById("start-screen");
const gameScreen=document.getElementById("game-screen");
const finalScreen=document.getElementById("final-screen");
const targets=document.querySelectorAll(".target");
const ball=document.getElementById("ball");
const goalkeeper=document.querySelector(".goalkeeper");
const goal=document.querySelector(".goal");
const messageCard=document.getElementById("message-card");
const messageText=document.getElementById("message-text");
const nextBtn=document.getElementById("next-btn");
const shotCounter=document.getElementById("shot-counter");
let currentShot=0;
let locked=false;
const messages=[
"Ciao! Sono Dario, laureato in ingegneria Informatica e appassionato di calcio!",
"Da 3 anni sono Data Analyst, istruttore e allenatore di calcio, oltre che Referee Manager per la mia squadra in Eccellenza!",
"Sono un ragazzo creativo e intraprendente, pronto a cogliere ogni opportunità nel mondo del calcio.",
"Amo lavorare in team e sviluppare idee anche controintuitive.",
"Complimenti per i gol! Se vuoi sapere di più ecco i miei contatti!"
];
startBtn.addEventListener("click",()=>{
startScreen.classList.remove("active");
gameScreen.classList.add("active");
});
function animateBall(targetX,targetY){
const startX=document.querySelector(".goal-area").offsetWidth/2;
const startY=340;
const duration=650;
const startTime=performance.now();
function frame(time){
let progress=(time-startTime)/duration;
if(progress>1) progress=1;
const curve=Math.sin(progress*Math.PI)*60;
const currentX=startX+(targetX-startX)*progress;
const currentY=startY+(targetY-startY)*progress-curve;
ball.style.left=currentX+"px";
ball.style.top=currentY+"px";
if(progress<1){requestAnimationFrame(frame);}
}
requestAnimationFrame(frame);
}
targets.forEach((target,index)=>{
target.addEventListener("click",()=>{
if(locked) return;
locked=true;
const rect=target.getBoundingClientRect();
const container=document.querySelector(".goal-area").getBoundingClientRect();
const x=rect.left+rect.width/2-container.left;
const y=rect.top+rect.height/2-container.top;
const column=index%3;
goalkeeper.classList.remove("left","right","center");
if(column===0){goalkeeper.classList.add("left");}
else if(column===2){goalkeeper.classList.add("right");}
else{goalkeeper.classList.add("center");}
animateBall(x,y);
goal.classList.add("animate");
if(navigator.vibrate){navigator.vibrate(40);}
setTimeout(()=>{
messageText.innerText=messages[currentShot];
messageCard.classList.remove("hidden");
},700);
});
});
nextBtn.addEventListener("click",()=>{
currentShot++;
locked=false;
if(currentShot>=messages.length){
gameScreen.classList.remove("active");
finalScreen.classList.add("active");
return;
}
shotCounter.innerText=`Rigore ${currentShot+1}/5`;
messageCard.classList.add("hidden");
goalkeeper.classList.remove("left","right","center");
goal.classList.remove("animate");
ball.style.left="50%";
ball.style.top="340px";
ball.style.transform="translate(-50%,-50%)";
});