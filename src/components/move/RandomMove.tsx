const newspaperSpinning = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const newspaperTiming = {
  duration: 2000,
  iterations: 1,
}

const ball = document.querySelector(".newspaper");

ball.animate(newspaperSpinning, newspaperTiming);
