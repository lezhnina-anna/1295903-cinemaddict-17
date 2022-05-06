import View from './view';

const createMoviesTitleTemplate = (isEmpty, filter) => {
  if (!isEmpty) {
    return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
  }

  let moviesTitleText = '';

  switch (filter) {
    case 'watchlist':
      moviesTitleText = 'There are no movies to watch now';
      break;
    case 'history':
      moviesTitleText = 'There are no watched movies now';
      break;
    case 'favorites':
      moviesTitleText = 'There are no favorite movies now';
      break;
    default:
      moviesTitleText = 'There are no movies in our database';
      break;
  }

  return `<h2 class="films-list__title">${moviesTitleText}</h2>`;
};

export default class MoviesTitleView extends View {
  constructor(isEmpty = false, filter = '') {
    super(() => createMoviesTitleTemplate(isEmpty, filter));
  }
}
