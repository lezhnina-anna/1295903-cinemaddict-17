import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const createMoviesTitleTemplate = (isEmpty, filter, isLoading) => {
  if (isLoading) {
    return '<h2 class="films-list__title">Loading...</h2>';
  }

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
  #isLoading = true;

  constructor(isEmpty = false, filter = '', isLoading = true) {
    super();
    this.#isEmpty = isEmpty;
    this.#filter = filter;
    this.#isLoading = isLoading;
  }

  get template() {
    return createMoviesTitleTemplate(this.#isEmpty, this.#filter, this.#isLoading);
  }
}
