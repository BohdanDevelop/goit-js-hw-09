function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyRef = document.body;

const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');

function onStartClick(event) {
  const timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  function onStopClick() {
    clearInterval(timerId);
    console.log('yup');
    stopRef.removeEventListener('click', onStopClick);
  }
  stopRef.addEventListener('click', onStopClick);
}

startRef.addEventListener('click', onStartClick);
