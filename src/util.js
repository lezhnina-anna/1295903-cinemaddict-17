import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeMovieDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeCommentDate = (date) => dayjs(date).format('YY/MM/D hh:m');

const getUniqueValues = (array) => array.filter((value, index, self) => self.indexOf(value) === index);

const humanizeRuntime = (runtime) => {
  const HOUR = 60;

  const hours = Math.floor(runtime / HOUR);
  const minutes = runtime % HOUR;

  return `${hours}h ${minutes}m`;
};

const formatDescription = (description, maxLength) => {
  if (description.length <= maxLength) {
    return description;
  }

  return `${description.substring(0, maxLength - 1)}...`;
};

const generateDate = (minDaysGap, maxDaysGap) => {
  const daysGap = getRandomInteger(minDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getAllIndexes = (arr, val) => {
  const indexes = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      indexes.push(i);
    }
  }
  return indexes;
};

const updateItem = (items, update, indexToUpdate = 0) => {
  const indexes = getAllIndexes(items, update);

  if (!indexes.length || ((indexes.length - 1) < indexToUpdate)) {
    return items;
  }

  return [
    ...items.slice(0, indexes[indexToUpdate]),
    update,
    ...items.slice(indexes[indexToUpdate] + 1)
  ];
};

export {
  getRandomInteger,
  humanizeMovieDate,
  getUniqueValues,
  humanizeRuntime,
  formatDescription,
  generateDate,
  humanizeCommentDate,
  isEscapeKey,
  updateItem
};
