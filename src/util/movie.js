import dayjs from 'dayjs';

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
