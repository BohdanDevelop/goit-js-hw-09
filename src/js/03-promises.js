import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  clickToClose: true,
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const returnValue = {
        position,
        delay,
      };
      if (shouldResolve) {
        resolve(returnValue);
      } else {
        reject(returnValue);
      }
    }, delay);
  });
}

function onButtonClick(event) {
  event.preventDefault();
  const delayValue = parseInt(event.currentTarget.elements.delay.value);
  const stepValue = parseInt(event.currentTarget.elements.step.value);
  const amountValue = parseInt(event.currentTarget.elements.amount.value);
  let timeVal;
  for (let i = 0; i < amountValue; i += 1) {
    if (i === 0) timeVal = delayValue;
    else timeVal += stepValue;
    createPromise(i + 1, timeVal)
      .then(value => Notify.success(value))
      .catch(error => Notify.failure(error));
  }
}
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onButtonClick);
