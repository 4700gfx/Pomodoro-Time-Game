//Variables & Elements 

let countdownInterval = null;
const timer = document.querySelector('.timer');
const hourEL = document.querySelector('.hour');
const minuteEL = document.querySelector('.minute');
const secondEL = document.querySelector('.second');
const playButton = document.querySelector('.play-button');
const resetButton = document.querySelector('.reset-button');

//Variables, Elements and Intializers

let score = null;
const semicircleElement = document.querySelectorAll('.semicircle');
const timeDisplayColor = document.querySelector('.outermost-circle')

//Time Input Variables

const hr = 0;
const min = 0;
const sec = 10;

//Time Conversion Variables
const hours = hr * 3600000;
const mintues = min * 60000;
const seconds = sec * 1000;
const setTime = hours + mintues + seconds;
const startTime = Date.now();
const futureTime = setTime + startTime;



//Countdown Timer Func. 

const countdownTimer = function (){
  
  const currentTime = Date.now();
  const remainingTime = futureTime - currentTime;
  const currentAngle = (remainingTime/setTime) * 360;
  


  
  //Progress Indicator
  if(currentAngle > 180){
    semicircleElement[0].style.transform = 'rotate(180deg)';
    semicircleElement[1].style.transform = `rotate(${currentAngle}deg)`;
    semicircleElement[2].style.display = 'none';
  } else {
    semicircleElement[0].style.transform = `rotate(${currentAngle}deg)`;
    semicircleElement[1].style.transform = `rotate(${currentAngle}deg)`;
    semicircleElement[2].style.display = 'block';
    
  }


  //Timer 
  const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
  const secs = Math.floor((remainingTime / 1000) % 60);
 
  //Dymanically Typing The Time
  // hourEL.innerHTML = `${hrs}`
  // minuteEL.innerHTML = `${mins}`
  // secondEL.innerHTML = `${secs}`



  //5 Second Condition


  //End Condition

  if(remainingTime < 0){
    clearInterval(countdownLoop);
    semicircleElement[0].style.display = 'none';
    semicircleElement[1].style.display = 'none';
    semicircleElement[2].style.display = 'none';
    timeDisplayColor.style.backgroundColor = 'rgba(49, 87, 44)' //Changes Timer Display to Green
    document.body.style.backgroundColor = 'rgba(127, 149, 75)' //Changes Timer Background Color to Green

  }


}

const countdownLoop =  setInterval(countdownTimer)
countdownTimer();




playButton.addEventListener('click', startCountdown);
resetButton.addEventListener('click', clearInterval(countdownLoop));