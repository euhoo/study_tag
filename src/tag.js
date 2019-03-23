import _ from 'lodash';
import generatePlayingField from './makeTable';
import makeKeyEvents from './keyboardEvents';
import makeMouseEvents from './mouseEvents';

export default (randomize = _.shuffle) => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const randomized = randomize(values);
  const div = document.querySelector('.gem-puzzle');
  div.appendChild(generatePlayingField(randomized));
  const table = document.querySelector('table');
  makeKeyEvents(table);
  makeMouseEvents(table);
};
