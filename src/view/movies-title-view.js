import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const createMoviesTitleTemplate = (isEmpty, filter) => {
  if (!isEmpty) {
    return '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
  }

  let moviesTitleText;

  switch (filter) {
    case FilterType.WATCHLIST:
      moviesTitleText = 'There are no movies to watch now';
      break;
    case FilterType.HISTORY:
      moviesTitleText = 'There are no watched movies now';
      break;
    case FilterType.FAVORITES:
      moviesTitleText = 'There are no favorite movies now';
      break;
    default:
      moviesTitleText = 'There are no movies in our database';
      break;
  }

  return `<h2 class="films-list__title">${moviesTitleText}</h2>`;
};

export default class MoviesTitleView extends AbstractView {
  #isEmpty = false;
  #filter = '';

  constructor(isEmpty = false, filter = '') {
    super();
    this.#isEmpty = isEmpty;
    this.#filter = filter;
  }

  get template() {
    return createMoviesTitleTemplate(this.#isEmpty, this.#filter);
  }
}
