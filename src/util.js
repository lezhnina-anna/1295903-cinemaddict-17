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

export {getRandomInteger, humanizeMovieDate, getUniqueValues, humanizeRuntime, formatDescription, generateDate, humanizeCommentDate};
