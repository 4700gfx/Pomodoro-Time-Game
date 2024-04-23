//Variables & Elements 

//Buttons Variables & Elements
let focusButton = document.getElementById("focus");
let shortBreakButton = document.getElementById("short-break");
let longBreakButton = document.getElementById("long-break");
let sessionButtons = document.querySelectorAll(".btn");
let resetButton = document.getElementById("reset");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
let statusBar = document.getElementById("status-bar");
let mainScore = document.getElementById("main-score");

//Timer Variables & Elements
let active = "focus";
let time = document.getElementById("time");
let set;
let count = 59;
let pause = true;
let minCount = 0;
time.textContent = `${minCount + 1}:00`



//To Do List Variables & Elements
const inputBox = document.getElementById("taskbar-input");
const listContainer = document.getElementById("list-container");
let lowPriorityTaskButton = document.getElementById("low-priority");
let medPriorityTaskButton = document.getElementById("med-priority");
let highPriorityTaskButton = document.getElementById("high-priority");


//Score and Game Logic;
let points = [];
let score = 0;
let lowValue = 0;
let midValue = 0;
let highValue = 0;
const SCORE_HISTORY_KEY = 'game_score_history';
let scoreHistory = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY)) || [];

//Game Logic Functions

function calculateScore() {
  // Use 'reduce()' to sum all the elements in the 'points' array
  score = points.reduce((total, point) => total + point, 0);

  // Retrieve the current score history from localStorage
  let scoreHistory = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY)) || [];

  // Add the current score to the score history
  scoreHistory.push(score);


}

// Function to retrieve the score history from localStorage
function getScoreHistory() {
  let scoreHistory = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY)) || [];
  return scoreHistory;
}

function clearScoreHistory() {
  localStorage.removeItem(SCORE_HISTORY_KEY);
}







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
function insertLowTask() {
  if (inputBox.value === '') {
    alert("Please Input a Task to Start The Game 📌");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + " " + "(+100)";
    li.setAttribute("data-points", "100"); // Set the point value here
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}

function insertMedTask(){
  if(inputBox.value === ''){
    alert("Please Input a Task to Start The Game 📌");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + " " + "(+300)";
    li.setAttribute("data-points", "300"); // Set the point value here
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML ="\u00d7";
    li.appendChild(span);
    midValue = 300;
  }
  inputBox.value = '';
  saveData();
}


function insertHighTask(){
  if(inputBox.value === ''){
    alert("Please Input a Task to Start The Game 📌");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + " " + "(+500)";
    li.setAttribute("data-points", "500"); // Set the point value here
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML ="\u00d7";
    li.appendChild(span);
    highValue = 500;
  }
  inputBox.value = '';
  saveData();
}




//Functions for Timer 

//Zero Padder Function
function appendZero(value){
  value = value < 10 ? `0${value}`: value
  return value;
}

//Focus Function
function removeFocus(){
  sessionButtons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  })
}



//Event Listener Functions
lowPriorityTaskButton.addEventListener("click", insertLowTask);
medPriorityTaskButton.addEventListener("click", insertMedTask);
highPriorityTaskButton.addEventListener("click", insertHighTask);


listContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    e.target.classList.toggle("checked-task");
    saveData();
  } 
  else if (e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }


  if (e.target.classList.contains("checked-task")) {
    let pointValue = parseInt(e.target.getAttribute("data-points")); // Get the point value
    points.push(pointValue);
    console.log(points);
  }
    // Call 'calculateScore' to update the 'score' after a task is checked
    calculateScore();
    console.log("Score:", score);
}, false);






resetButton.addEventListener("click",(resetTime = () => {
  pauseTimer();
  switch(active){
    case "long-break": 
    minCount = 14;
    break;
    case "short-break": minCount = 4;
    break;
    default:
    minCount = 24;
    break;
  }
  points = [];
  score = 0;
  count = 59;
  time.textContent = `${minCount + 1}:00`
  focusButton.classList.add("btn-focus")
  longBreakButton.classList.remove("btn-focus")
  shortBreakButton.classList.remove("btn-focus")
  statusBar.textContent = "💼 Keep On Working 💼";
  statusBar.style.color = "rgba(134, 9, 34)";
  longBreakButton.style.color = "black";
  shortBreakButton.style.color = "black";
  time.style.color = "rgba(134, 9, 34)";
  document.body.style.backgroundColor = "rgba(134, 9, 34)";

  })
);

focusButton.addEventListener("click", () => {
    removeFocus();
    focusButton.classList.add("btn-focus")
    pauseTimer();
    count = 59; 
    minCount = 44;
    time.textContent = `${minCount + 1}:00`;


    statusBar.textContent = "💼 Keep On Working 💼";
    statusBar.style.color = "rgba(134, 9, 34)";
    longBreakButton.style.color = "black";
    shortBreakButton.style.color = "black";
    time.style.color = "rgba(134, 9, 34)";
    document.body.style.backgroundColor = "rgba(134, 9, 34)";
    
});

shortBreakButton.addEventListener("click", () => {
  removeFocus();
  shortBreakButton.classList.add("btn-focus")
  pauseTimer();
  minCount = 4; 
  count = 59; 
  time.textContent = `${appendZero(minCount + 1)}:00`
  document.body.style.backgroundColor = "green";
  time.style.color = "green";
  statusBar.textContent = "🚨 Time For A 5 Minute Break...🚨";
  statusBar.style.color = "green";
  shortBreakButton.style.color = "green";
  longBreakButton.style.color = "black";
  longBreakButton.classList.remove("btn-focus")
  focusButton.classList.remove("btn-focus")

});

longBreakButton.addEventListener("click", () => {
  removeFocus();
  longBreakButton.classList.add("btn-focus")
  pauseTimer();
  minCount = 14; 
  count = 59; 
  time.textContent = `${minCount + 1}:00`
  document.body.style.backgroundColor = "green";
  time.style.color = "green";
  statusBar.textContent = "🚨 Time For A 15 Minute Break...🚨";
  statusBar.style.color = "green";
  longBreakButton.style.color = "green";
  shortBreakButton.classList.remove("btn-focus")
  focusButton.classList.remove("btn-focus")
  longBreakButton.classList.add("btn-focus")


});

playButton.addEventListener("click", () => {
  pauseButton.classList.remove("hide-button")
  pauseButton.classList.add("show-button");
  playButton.classList.add("hide-button");
  
  if(pause){
    pause = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`
    set = setInterval(()=>{
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if(count == 0){
        if(minCount != 0){
          minCount--;
          count = 60;
        }else{
          clearInterval(set);
          document.body.style.backgroundColor = "green";
          statusBar.textContent = "🚨 Time For A 15 Minute Break...🚨";
          statusBar.style.color = "green";
          alert(`Your Score is ${score}👾! Please Choose Long or Short Break ⏸️`);
          
          // Retrieve the current score history from localStorage
          let scoreHistory = JSON.parse(localStorage.getItem(SCORE_HISTORY_KEY)) || [];
          
          // Store the updated score history back in localStorage
          scoreHistory.push(score);
          localStorage.setItem(SCORE_HISTORY_KEY, JSON.stringify(scoreHistory));
          console.log("Score calculated:", score);
          console.log("Updated score history:", scoreHistory);
          

        }
      }
    }, 1000)
  }




});



pauseButton.addEventListener("click",(pauseTimer = () =>{
  pause = true;
  clearInterval(set);
  playButton.classList.remove("hide-button");
  playButton.classList.add("show-button");
  pauseButton.classList.remove("show-button");
  pauseButton.classList.add("hide-button")

}))
