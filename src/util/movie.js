import dayjs from 'dayjs';

const humanizeMovieDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeCommentDate = (date) => dayjs(date).format('D MMMM YYYY hh:m');

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

export {
  humanizeMovieDate,
  humanizeRuntime,
  formatDescription,
  humanizeCommentDate,
  sortByDate,
  sortByRating,
};
