//Variables & Elements 

let countdownInterval = null;
const playButton = document.querySelector('.play-button');





function startCountdown() {
  const countdownDuration = 10;
  const countdownProgress = document.getElementById('countdown-progress');
  const countdownText = document.getElementById('countdown-text');

  const anglePerSecond = 360 / countdownDuration;

  let timeLeft = countdownDuration;
  countdownInterval = setInterval(() => {
    timeLeft--;
    countdownProgress.style.transform = `rotate(${360 - anglePerSecond * (countdownDuration - timeLeft)}deg)`;
    countdownText.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      countdownText.textContent = 'Done!';
    }
  }, 1000);
}


playButton.addEventListener('click', startCountdown);
