//Variables & Elements 
let countdownInterval = null;
const mainScore = document.getElementById('main-score');
// const statusBar = document.querySelectorAll("status-bar");
const hourEL = document.querySelector('.hour');
const minuteEL = document.querySelector('.minute');
const secondEL = document.querySelector('.second');


//Buttons Variables & Elements
const playButton = document.querySelector('.play-button');
const resetButton = document.querySelector('.reset-button');
const longSession = document.querySelector('.long-session');
const shortSession = document.querySelector('.short-session');
const longBreak = document.querySelector('.long-break');
const shortBreak = document.querySelector('.short-break');

//Timer Variables & Elements 
const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");
const colon = document.querySelector(".colon");

//Time Input & Elements
const hr = 0;
const min = 0;
const sec = 10;

const hours = hr * 36000000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;

const startTime = Date.now();
const futureTime = startTime + setTime;


//Functions for Timer 

const timerLoop =setInterval(countdownTimer);

function countdownTimer(){
//Initalize Timer
const currentTime = Date.now();
const remainingTime = futureTime - currentTime;
const angle = (remainingTime/setTime) * 360;

//Progress Indicator
if(angle > 180){
  semicircles[2].style.display = 'none';
  semicircles[0].style.transform = 'rotate(180deg)'; 
  semicircles[1].style.transform = `rotate(${angle}deg)`; 
} else{
  semicircles[2].style.display = 'block';
  semicircles[0].style.transform = `rotate(${angle}deg)`; 
  semicircles[1].style.transform = `rotate(${angle}deg)`; 
}


//Timer 
const hrs = Math.floor((remainingTime/(1000* 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping: false}); ///
const mins = Math.floor((remainingTime/(1000 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping: false});
const secs = Math.floor((remainingTime/(1000)) % 60).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping: false});

timer.innerHTML = `
<div>${hrs}</div>
<div class="colon">:</div>
<div>${mins}</div>
<div class="colon">:</div>
<div>${secs}</div>

`;

//5-Sec Condition
if(remainingTime <=6000){
  semicircles[0].style.backgroundColor = "green";
  semicircles[1].style.backgroundColor = "green";
  timer.style.color="green";

}



//End Timer
if(remainingTime < 0){
  clearInterval(timerLoop);
  semicircles[0].style.display = 'none';
  semicircles[1].style.display = 'none';
  semicircles[2].style.display = 'none';

  timer.innerHTML = `
  <div>00</div>
  <div class="colon">:</div>
  <div>00</div>
  <div class="colon">:</div>
  <div>00</div>

  `;

  timer.style.color ="lightgrey";
  document.querySelector("status-bar").textContent = 'Work Is Done';
  statusBar.style.color = "green";
}
}


