import dayjs from 'dayjs';
import {FilterType} from './const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeMovieDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeCommentDate = (date) => {
  const now = dayjs();
  const diffInMinutes = now.diff(dayjs(date), 'minute');
  const diffInHours = now.diff(dayjs(date), 'hour');
  const diffInDays = now.diff(dayjs(date), 'day');
  const diffInMonth = now.diff(dayjs(date), 'month');
  const diffInYears = now.diff(dayjs(date), 'minute');

  if (diffInMinutes < 1) {
    return 'now';
  }
  if (diffInHours < 1) {
    return 'a few minutes ago';
  }
  if (diffInDays < 1) {
    return `${diffInHours} hours ago`;
  }
  if (diffInMonth < 1) {
    return `${diffInDays} days ago`;
  }
  if (diffInYears < 1) {
    return `${diffInMonth} month ago`;
  }

  return `${diffInYears} years ago`;
};

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

const isEnterKey = (evt) => evt.key === 'Enter';

const getWeightForNull = (valueA, valueB) => {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
};

const sortByDate = (movieA, movieB) => {
  const dateA = movieA.filmInfo.release.date;
  const dateB = movieB.filmInfo.release.date;

  const weight = getWeightForNull(dateA, dateB);

  return weight ?? dayjs(dateB).diff(dayjs(dateA));
};

const sortByRating = (movieA, movieB) => {
  const ratingA = movieA.filmInfo.totalRating;
  const ratingB = movieB.filmInfo.totalRating;

  const weight = getWeightForNull(ratingA, ratingB);

  return weight ?? ratingB - ratingA;
};

const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.userDetails.favorite)
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
  sortByDate,
  sortByRating,
  filter,
  isEnterKey
};
