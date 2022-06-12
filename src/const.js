const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const GENRES = [
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Thriller'
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const TITLES = [
  'Made for each other',
  'Popeye meets sinbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The great flamarion',
  'The man with the golden arm'
];

const NAMES = [
  'Takeshi Kitano',
  'Morgan Freeman',
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'Tom Ford'
];

const COUNTRIES = [
  'USA',
  'Finland',
  'Albania',
  'Russia',
  'Japan',
  'England',
  'France',
  'Norway',
  'North Korea'
];

const COMMENTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'In rutrum ac purus sit amet tempus.',
  'Nice',
  'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.'
];

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const ActionType = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const FilterType = {
  ALL: 'ALL',
  WATCHLIST: 'WATCHLIST',
  HISTORY: 'HISTORY',
  FAVORITES: 'FAVORITES',
};

export {
  POSTERS,
  GENRES,
  DESCRIPTION,
  TITLES,
  NAMES,
  COUNTRIES,
  COMMENTS,
  EMOTIONS,
  SortType,
  UpdateType,
  FilterType,
  ActionType
};
