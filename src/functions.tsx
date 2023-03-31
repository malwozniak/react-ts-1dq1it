/** Funkcja generująca randomową liczbą kart - Function generate Random Number of Cards  */
function generateRandomAnimation(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {
    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
}
