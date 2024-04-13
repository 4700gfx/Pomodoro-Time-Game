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

//Buttons Variables & Elements
const playButton = document.querySelector('.play-button');
const resetButton = document.querySelector('.reset-button');
const longSession = document.querySelector('.long-session');
const shortSession = document.getElementById('.short-session');
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
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML ="\u00d7";
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}




//Functions for Timer 
const timerLoop = setInterval(updateTimer);


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

//Five Second Condtion Animation Function
function fiveSecNotificationWork(){
  semicircles[0].style.backgroundColor = "green";
  semicircles[1].style.backgroundColor = "green";
  timer.style.color="green";
}


// Function to update the timer display
function updateTimer() {
  const currentTime = Date.now();
  let remainingTime = futureTime - currentTime;
  const angle = (remainingTime / setTime) * 360;
  
  
  if(longSession.classList.contains("hit-button")){
    remainingTime += 60000;
    longSession.classList.toggle("hit-button");
    updateTimer();
  }
  
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

// Button event listener to add 60 seconds



//Event Listener

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

