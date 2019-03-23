export default (table) => {
  const findEl = el => ({ row: el.closest('tr').rowIndex, cell: el.cellIndex });
  table.addEventListener('click', ({ target }) => {
    const passive = table.querySelector('.table-active');

    const before = findEl(passive);
    const after = findEl(target);
    /* если кликаем не на соседнюю , то сумма всегда больше 1 */
    const dist = Math.abs(after.row - before.row) + Math.abs(after.cell - before.cell);

    if (dist === 1) {
      passive.classList.remove('table-active');
      target.classList.add('table-active');
      /* eslint no-param-reassign: "error" */
      [passive.textContent, target.textContent] = [target.textContent, passive.textContent];
    }
  });
};
