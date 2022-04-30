import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'center-top',
  clickToClose: true,
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date().getTime();
    const selectedTime = new Date(selectedDates[0]).getTime();
    console.log(selectedDates[0]);
    console.log(currentTime);
    console.log(selectedTime);
    if (currentTime < selectedTime) {
      buttonRef.removeAttribute('disabled');
      buttonRef.addEventListener('click', () => onButtonClick(event, selectedTime));
    } else {
      Notify.failure('Enter a valid date in the future');
    }
  },
};
function onButtonClick(event, selectedTime) {
  const int = setInterval(() => {
    const currentT = new Date().getTime();
    const timeDiffer = selectedTime - currentT;
    const convertedDifference = convertMs(timeDiffer);
    secondsRef.innerHTML = `${convertedDifference.seconds}`.padStart(2, '0');
    minutesRef.innerHTML = `${convertedDifference.minutes}`.padStart(2, '0');
    hoursRef.innerHTML = `${convertedDifference.hours}`.padStart(2, '0');
    daysRef.innerHTML = `${convertedDifference.days}`.padStart(2, '0');
    console.log(convertedDifference);
    if (timeDiffer < 1000) {
      clearInterval(int);
    }
  }, 1000);
}
const buttonRef = document.querySelector('[data-start]');
const inputRef = document.querySelector('#datetime-picker');
const secondsRef = document.querySelector('[data-seconds]');
const minutesRef = document.querySelector('[data-minutes]');
const hoursRef = document.querySelector('[data-hours]');
const daysRef = document.querySelector('[data-days]');
buttonRef.setAttribute('disabled', 'disabled');
const fp = flatpickr(inputRef, options);
