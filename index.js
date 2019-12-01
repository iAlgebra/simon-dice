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
        machineTurn();
      }
    }
  };
});

function machineTurn() {
  const $lastSquareSelectedByMachine = getRandomSquare();
  machineList.push($lastSquareSelectedByMachine);
  machineList.forEach(function(machineSquare, i) {
    setTimeout(function() {
      machineSquare.style.border = '2px solid black';
      setTimeout(function() {
        machineSquare.style.border = 'none';
      }, 1000);
    }, 1000 * i);
  });
  humanList = [];
}
