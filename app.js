const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]

];


const grid = () => Array.from(document.getElementsByClassName('q'));


const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

const endGame = (winningSequence) => {
  winningSequence.forEach(_qE1 => _qE1.classList.add('winner'))
  disableListener();
}

const checkForVictory = () => {
  let victory = false;

  winningCombos.forEach(_c => {
    const _grid = grid();

    const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]], ];
    if (allSame(sequence)) {
      victory = true;
      endGame(sequence)
    }
  })
  return victory;
}
// this is an helper function
// replaces the string in q class with just numbers

const qNumId = (qE1) => Number.parseInt(qE1.id.replace('q', ''))
// helper function for empty quadrant to determine which of the quadrant is left without selected

const emptyQs = () => grid().filter(_qE1 => _qE1.innerText === '');

// check if they are all the same

const allSame = (arr) => arr.every(_qE1 => _qE1.innerText === arr[0].innerText && _qE1.innerText !== '');




const enableListeners = () => grid().forEach(_qE1 => _qE1.addEventListener('click', clickFn));

const disableListener = () => grid().forEach(_qE1 => _qE1.removeEventListener('click', clickFn));


const opponentTurn = () => {
  disableListener();
  setTimeout(() => {
    takeTurn(opponentChoice(), 'O');
    if (!checkForVictory())
      enableListeners();
  }, 0700)
}
const takeTurn = (index, letter) => grid()[index].innerText = letter;

const clickFn = ($event) => {
  takeTurn(qNumId($event.target), 'X');
  if (!checkForVictory())
    opponentTurn();
}

enableListeners();