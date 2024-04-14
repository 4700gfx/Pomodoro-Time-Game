//Variables & Elements 
let countdownInterval = null;
const mainScore = document.getElementById('main-score');
const hourEL = document.querySelector('.hour');
const minuteEL = document.querySelector('.minute');
const secondEL = document.querySelector('.second');

let timerSection = document.getElementById("countdown");
let outerCircle = document.getElementById("outer-circle");
let colonColor = document.getElementById("colon-color");
let statusBar = document.getElementById("status-bar");

let score = document.getElementById("main-score");
let timeElapsed = document.getElementById("time-elapsed");
let sessionNumber = document.getElementById("session-number");

//Buttons Variables & Elements
const playButton = document.querySelector('.play-button');
const pauseButton = document.querySelector('.pause-button');
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
const min = 10;
const sec = 0;

const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = hours + minutes + seconds;

const startTime = Date.now();
let futureTime = startTime + setTime;


//To Do List Variables & Elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let addTask = document.getElementById("add-task");


//To Do List Functions 


//Saving Data to Storage and Loading on Reload
function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}

showTask();


//Task Adding Function 
function insertTask(){
  if(inputBox.value === ''){
    alert("Please Input a Task to Start The Game 📌");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + " " + "(+300)";
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML ="\u00d7";
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}





//Functions for Timer 
const timerLoop = setInterval(updateWorkTimer);


//Work Session Done Animation Functions
function workSessionDone() {
  timer.style.color ="lightgrey";
  statusBar.innerHTML = "🎉 Work Is Done 🎉";
  statusBar.style.color = "green"; 
  document.body.style.backgroundColor = "rgba(79, 119, 45)"
  timerSection.style.backgroundColor = "rgba(79, 119, 45)"
  outerCircle.style.backgroundColor = "rgba(49, 87, 44)"
  addTask.style.backgroundColor = "rgba(127, 149, 75)"
}


//WORK ON WORK SESSION ACTIVE CSS FUNCTION
function workSessionActive() {
  timer.style.color = "rgba(134, 9, 34)";
  statusBar.innerHTML = "🎉 Work Is Done 🎉";
  statusBar.style.color = "red"; 
  document.body.style.backgroundColor = "rgba(134, 9, 34)";
  timerSection.style.backgroundColor = "rgba(236, 172, 177)";
  outerCircle.style.backgroundColor = "red"; 
  addTask.style.backgroundColor = "rgba(236, 172, 177)";
}


//Five Second Condtion Animation Function
function fiveSecNotificationWork(){
  semicircles[0].style.backgroundColor = "green";
  semicircles[1].style.backgroundColor = "green";
  timer.style.color="green";
}


// Work Timer Function
function updateWorkTimer() {
  let currentTime = Date.now();
  let remainingTime = futureTime - currentTime;
  let angle = (remainingTime / setTime) * 360;
  
  
  
  // Progress Indicator
  if (angle > 180) {
    semicircles[2].style.display = 'none';
    semicircles[0].style.transform = 'rotate(180deg)';
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircles[2].style.display = 'block';
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  }
  
  
  // Timer
  const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  
  // Timer Text Field
  timer.innerHTML = `
  <div>${hrs}</div>
  <div class="colon">:</div>
  <div>${mins}</div>
  <div class="colon">:</div>
  <div>${secs}</div>
  `;
  
  
  
  // 5-Sec Condition
  if (remainingTime <= 6000) {
    fiveSecNotificationWork();
  }
  
  // End Timer
  if (remainingTime < 0) {
    clearInterval(timerLoop);
    semicircles[0].style.display = 'none';
    semicircles[1].style.display = 'none';
    semicircles[2].style.display = 'none';
    
    timer.innerHTML =
    `<div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    <div class="colon" id="colon-color">:</div>
    <div>00</div>`;
    
    workSessionDone();
  }
  
  
}

//WORK ON BREAK TIMER FUNCTION
function updateBreakTimer() {
  let currentTime = Date.now();
  let addedTime = 0; 
  let remainingTime = (futureTime + addedTime) - currentTime;
  let angle = (remainingTime / setTime) * 360;
  
  
  
  // Progress Indicator
  if (angle > 180) {
    semicircles[2].style.display = 'none';
    semicircles[0].style.transform = 'rotate(180deg)';
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircles[2].style.display = 'block';
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  }
  
  
  // Timer
  const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  
  // Timer Text Field
  timer.innerHTML = `
  <div>${hrs}</div>
  <div class="colon">:</div>
  <div>${mins}</div>
  <div class="colon">:</div>
  <div>${secs}</div>
  `;
  
  
  
  // 5-Sec Condition
  if (remainingTime <= 6000) {
    fiveSecNotificationBreak();
  }
  
  // End Timer
  if (remainingTime < 0) {
    clearInterval(timerLoop);
    semicircles[0].style.display = 'none';
    semicircles[1].style.display = 'none';
    semicircles[2].style.display = 'none';
    
    timer.innerHTML =
    `<div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    <div class="colon" id="colon-color">:</div>
    <div>00</div>`;
    
    breakSessionDone();
  }
  
  
}




//Event Listener

//WORK ON PLAY BUTTON EVENT
// playButton.addEventListener('click', function(e){
//   setInterval(timerLoop);
  
// });

// pauseButton.addEventListener('click', function(e){
//   clearInterval(timerLoop);
// });




addTask.addEventListener("click", insertTask);
inputBox.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    insertTask();
  }
});

listContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked-task");
    saveData();
  } 
  else if (e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }
}, false);



//Longer Sesion Button Event
longSession.addEventListener("click", function(e){
  e.target.classList.toggle("hit-button");
  if(longSession.classList.contains("hit-button")){
    futureTime += 900000;
    longSession.classList.toggle("hit-button");
  }
})


//Shoter Session Button Event 
shortSession.addEventListener("click", function(e){
  e.target.classList.toggle("hit-button");
  
  if(shortSession.classList.contains("hit-button")){
    futureTime -= 300000;
    shortSession.classList.toggle("hit-button");
  } else if (remainingTime > 0){
    clearInterval(timerLoop);
    semicircles[0].style.display = 'none';
    semicircles[1].style.display = 'none';
    semicircles[2].style.display = 'none';
    
    timer.innerHTML =
    `<div>00</div>
    <div class="colon">:</div>
    <div>00</div>
    <div class="colon" id="colon-color">:</div>
    <div>00</div>`;
    
    workSessionDone();
  }
  
  
  
})




