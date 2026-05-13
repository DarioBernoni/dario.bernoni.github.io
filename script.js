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
"Hi, I’m Dario. Data analyst, football mind, creative builder.",
"3+ years between data, coaching and football operations.",
"I love turning unconventional ideas into real projects.",
"Teamwork, creativity and football culture drive everything I do.",
"You scored all 5 penalties. Now let’s talk."
];

const commentary=[
"TOP CORNER",
"CLINICAL",
"ICE COLD",
"PERFECT FINISH",
"WORLD CLASS"
];

startBtn.addEventListener("click",()=>{

startScreen.classList.remove("active");

setTimeout(()=>{
gameScreen.classList.add("active");
},200);

});

/* CAMERA SHAKE */

function shakeScreen(){

document.body.classList.add("shake");

setTimeout(()=>{
document.body.classList.remove("shake");
},250);

}

/* BALL ANIMATION */

function animateBall(targetX,targetY){

const startX=document.querySelector(".goal-area").offsetWidth/2;
const startY=378;

const duration=720;

const startTime=performance.now();

function frame(time){

let progress=(time-startTime)/duration;

if(progress>1) progress=1;

const ease=1-Math.pow(1-progress,3);

const curve=Math.sin(progress*Math.PI)*90;

const currentX=startX+(targetX-startX)*ease;

const currentY=startY+(targetY-startY)*ease-curve;

const scale=1-(progress*.45);

ball.style.left=currentX+"px";
ball.style.top=currentY+"px";

ball.style.transform=
`translate(-50%,-50%) scale(${scale}) rotate(${progress*520}deg)`;

if(progress<1){

requestAnimationFrame(frame);

}

}

requestAnimationFrame(frame);

}

/* GOALKEEPER AI */

function goalkeeperMove(column){

goalkeeper.classList.remove(
"left",
"right",
"center",
"prepare-left",
"prepare-right",
"prepare-center"
);

if(column===0){

goalkeeper.classList.add("prepare-left");

setTimeout(()=>{
goalkeeper.classList.remove("prepare-left");
goalkeeper.classList.add("left");
},120);

}

else if(column===2){

goalkeeper.classList.add("prepare-right");

setTimeout(()=>{
goalkeeper.classList.remove("prepare-right");
goalkeeper.classList.add("right");
},120);

}

else{

goalkeeper.classList.add("prepare-center");

setTimeout(()=>{
goalkeeper.classList.remove("prepare-center");
goalkeeper.classList.add("center");
},120);

}

}

/* SHOOT */

targets.forEach((target,index)=>{

target.addEventListener("click",()=>{

if(locked) return;

locked=true;

const rect=target.getBoundingClientRect();

const container=
document.querySelector(".goal-area")
.getBoundingClientRect();

const x=
rect.left+
rect.width/2-
container.left;

const y=
rect.top+
rect.height/2-
container.top;

const column=index%3;

/* FX */

shakeScreen();

goal.classList.add("animate");

goalkeeperMove(column);

animateBall(x,y);

if(navigator.vibrate){

navigator.vibrate([40,30,40]);

}

/* MESSAGE */

setTimeout(()=>{

messageText.innerHTML=`
<div style="
font-size:11px;
letter-spacing:3px;
opacity:.55;
margin-bottom:10px;
">
${commentary[currentShot]}
</div>

${messages[currentShot]}
`;

messageCard.classList.remove("hidden");

},820);

});

});

/* NEXT */

nextBtn.addEventListener("click",()=>{

currentShot++;

locked=false;

if(currentShot>=messages.length){

gameScreen.classList.remove("active");

setTimeout(()=>{
finalScreen.classList.add("active");
},250);

return;

}

shotCounter.innerText=`Penalty ${currentShot+1}/5`;

messageCard.classList.add("hidden");

goalkeeper.classList.remove(
"left",
"right",
"center",
"prepare-left",
"prepare-right",
"prepare-center"
);

goal.classList.remove("animate");

ball.style.left="50%";

ball.style.top="378px";

ball.style.transform=
"translate(-50%,-50%) scale(1) rotate(0deg)";

});
