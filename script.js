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

//Timer Variables & Elements
let active = "focus";
let time = document.getElementById("time");
let set;
let count = 59;
let pause = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`


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

function insertLowTask(){
  if(inputBox.value === ''){
    alert("Please Input a Task to Start The Game 📌");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value + " " + "(+100)";
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML ="\u00d7";
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
}


function insertHighTask(){
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
addTask.addEventListener("click", insertTask);


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

