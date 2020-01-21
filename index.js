const $startButton = document.querySelector('#start');
const $squares = document.querySelectorAll('.square');
const $state = document.querySelector('#state');
let machineList = [];
let humanList = [];
let $round = document.querySelector('#round');
let machinePlays = false;
let gameStarted = false;

updateState('Click on "Start" to start playing!');

function updateState(message) {
  $state.textContent = message;
}

function getRandomSquare() {
  const $squares = document.querySelectorAll('.square');
  const index = Math.floor(Math.random() * $squares.length);
  return $squares[index];
}

$startButton.onclick = function() {
  if (gameStarted) {
    location.reload();
  }
  gameStarted = true;
  machineList = [];
  $round.textContent = '0';
  $state.classList.remove('alert-danger');
  $state.classList.add('alert-primary');
  this.blur(); // removes focus outline
  machineTurn();
};

$squares.forEach(function(square) {
  square.onclick = function() {
    if (machinePlays) {
      return;
    }
    squareLightsAnimation(this, 0, 500);
    humanList.push(this);
    const machineSquare = machineList[humanList.length - 1];
    if (this !== machineSquare) {
      machinePlays = true;
      updateState('You lost!!! Click on "Start" to play again');
      $state.classList.add('alert-danger');
      $state.classList.remove('alert-primary');
      $round.textContent = '0';
      humanList = [];
      machineList = [];
    } else {
      if (humanList.length === machineList.length) {
        setTimeout(machineTurn, 1000);
      }
    }
  };
});

function machineTurn() {
  const delayBase = 1000;
  const duration = 500;
  updateState('Machine\'s turn');
  machinePlays = true;
  $round.textContent++;
  const $lastSquareSelectedByMachine = getRandomSquare();
  machineList.push($lastSquareSelectedByMachine);
  machineList.forEach(function(machineSquare, i) {
    squareLightsAnimation(machineSquare, delayBase * i, duration);
  });
  const lastIndex = machineList.length - 1;
  const totalDuration = delayBase * lastIndex + duration;
  setTimeout(function() {
    updateState('User\'s turn');
    machinePlays = false;
  }, totalDuration);
  humanList = [];
}

function squareLightsAnimation(square, delay, duration) {
  setTimeout(function() {
    square.style.opacity = '1';
    setTimeout(function() {
      square.style.opacity = '0.5';
    }, duration);
  }, delay);
}
