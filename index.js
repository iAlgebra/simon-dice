const $startButton = document.querySelector('#start');
const $squares = document.querySelectorAll('.square');
const $state = document.querySelector('#state');
let machineList = [];
let humanList = [];
let $round = document.querySelector('#round');

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
  $state.classList.remove('alert-danger');
  $state.classList.add('alert-primary');
  this.blur(); // removes focus outline
  machineTurn();
};

$squares.forEach(function(square) {
  square.onclick = function() {
    updateState('User\'s turn');
    humanList.push(this);
    const machineSquare = machineList[humanList.length - 1];
    if (this !== machineSquare) {
      updateState('You lost!!! Click on "Start" to play again');
      $state.classList.add('alert-danger');
      $state.classList.remove('alert-primary');
      $round.textContent = '0';
      humanList = [];
      machineList = [];
    } else {
      if (humanList.length === machineList.length) {
        setTimeout(machineTurn, 500);
      }
    }
  };
});

function machineTurn() {
  updateState('Machine\'s turn');
  $round.textContent++;
  const $lastSquareSelectedByMachine = getRandomSquare();
  machineList.push($lastSquareSelectedByMachine);
  machineList.forEach(function(machineSquare, i) {
    squareLightsAnimation(machineSquare, i);
    // setTimeout(function() {
    //   machineSquare.style.opacity = '1';
    //   setTimeout(function() {
    //     machineSquare.style.opacity = '0.5';
    //   }, 500);
    // }, 1000 * i);
  });
  humanList = [];
}

function squareLightsAnimation(square, i) {
  setTimeout(function() {
    square.style.opacity = '1';
    setTimeout(function() {
      square.style.opacity = '0.5';
    }, 500);
  }, 1000 * i);
}

// TO-DO:
// highlight user's actions (use the function squareLightsAnimation)
// figure out when it's the correct time to display the state message (i.e. who's turn is it?)
// disable user click when it's not its turn
