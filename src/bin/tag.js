import _ from 'lodash';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const generatePlayingField = (items) => {
  const tableEl = document.createElement('table');

  tableEl.className = 'table-bordered';
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === 3 && j === 3) {
        cell.classList.add('table-active');
      } else {
        cell.textContent = items[i + (j * 4)];
      }
    }
  }
  return tableEl;
};

const coordinateChange = {
  ArrowDown: [-1, 0],
  ArrowUp: [1, 0],
  ArrowLeft: [0, 1],
  ArrowRight: [0, -1],
};

export default (randomize = _.shuffle) => {
  const randomized = randomize(values);
  const div = document.querySelector('.gem-puzzle');
  div.appendChild(generatePlayingField(randomized));
  const table = document.querySelector('table');
  document.addEventListener('keyup', ({ key }) => {
    const emptyCell = document.querySelector('.table-active');
    const passive = {
      row: emptyCell.closest('tr').rowIndex,
      cell: emptyCell.cellIndex,
    };
    const active = {
      row: passive.row + coordinateChange[key][0],
      cell: passive.cell + coordinateChange[key][1],
    };
    Object.keys(active).forEach((el) => {
      if (active[el] > 3) active[el] = 3;
      if (active[el] < 0) active[el] = 0;
    });
    const numCell = table.rows[active.row].cells[active.cell];
    emptyCell.classList.remove('table-active');
    numCell.classList.add('table-active');
    [emptyCell.textContent, numCell.textContent] = [numCell.textContent, emptyCell.textContent];
  });

  const findEl = el => ({ row: el.closest('tr').rowIndex, cell: el.cellIndex });
  const changeDiv = ({ target }) => {
    const passive = table.getElementsByClassName('table-active')[0];

    const before = findEl(passive);
    const after = findEl(target);
    const dist = Math.abs(after.row - before.row) + Math.abs(after.cell - before.cell);

    if (dist < 2) {
      passive.classList.remove('table-active');
      target.classList.add('table-active');
      [passive.textContent, target.textContent] = [target.textContent, passive.textContent];
    }
  };
  table.addEventListener('click', changeDiv);
};
