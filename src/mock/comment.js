import {COMMENTS, EMOTIONS, NAMES} from '../const';
import {generateDate, getRandomInteger} from '../util';

export const generateComment = (i) => ({
  id: i,
  author: NAMES[getRandomInteger(0, NAMES.length - 1)],
  comment: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  date: generateDate(-500, 0),
  emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)]
});
