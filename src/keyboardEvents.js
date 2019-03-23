/* eslint-disable no-undef */
const coordinateChange = {
  ArrowDown: [-1, 0],
  ArrowUp: [1, 0],
  ArrowLeft: [0, 1],
  ArrowRight: [0, -1],
};

export default (table) => {
  document.addEventListener('keyup', ({ key }) => {
    if (key in coordinateChange) {
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
    }
  });
};
