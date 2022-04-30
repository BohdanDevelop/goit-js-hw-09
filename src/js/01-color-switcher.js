function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyRef = document.body;

const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');

function onStopClick(id) {
  clearInterval(id);
}
function onStartClick(event) {
  const timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopRef.addEventListener('click', evt => onStopClick(timerId));
}

startRef.addEventListener('click', onStartClick);
