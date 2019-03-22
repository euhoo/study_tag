const values = [8, 3, 2, 9, 11, 15, 5, 1, 7, 6, 13, 4, 12, 10, 14];

const generatePlayingField = () => {
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
        cell.textContent = values[i + (j * 4)];
      }
    }
  }
  return tableEl;
};

// BEGIN (write your solution here)
const findEl = el => ({ row: el.closest('tr').rowIndex, cell: el.cellIndex });
export default () => {
  const div = document.getElementsByClassName('gem-puzzle')[0];
  div.appendChild(generatePlayingField());
  const table = div.firstChild;

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