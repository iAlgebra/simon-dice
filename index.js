const $startButton = document.querySelector('#start');
const $squares = document.querySelectorAll('.square');
let machineList = [];
let humanList = [];

function getRandomSquare() {
  const $squares = document.querySelectorAll('.square');
  const index = Math.floor(Math.random() * $squares.length);
  return $squares[index];
}

$startButton.onclick = function() {
  this.blur(); // removes focus outline
  machineTurn();
};

$squares.forEach(function(square) {
  square.onclick = function() {
    humanList.push(this);
    const machineSquare = machineList[humanList.length - 1];
    if (this !== machineSquare) {
      alert('You lost!!');
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
