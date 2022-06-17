import {formatDescription, humanizeRuntime} from '../util';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createControlsTemplate = (userDetails, isDisabled) => {
  const ACTIVE_CONTROL_CLASS = 'film-card__controls-item--active';
  const {watchlist, alreadyWatched, favorite} = userDetails;

  const watchlistClassName = watchlist
    ? ACTIVE_CONTROL_CLASS
    : '';

  const watchedClassName = alreadyWatched
    ? ACTIVE_CONTROL_CLASS
    : '';

  const favoriteClassName = favorite
    ? ACTIVE_CONTROL_CLASS
    : '';

  return `<div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassName}" type="button" ${isDisabled ? 'disabled' : ''}>Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button" ${isDisabled ? 'disabled' : ''}>Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassName}" type="button" ${isDisabled ? 'disabled' : ''}>Mark as favorite</button>
          </div>`;
};

const createCardTemplate = (movie, isDisabled) => {
  const MAX_DESCRIPTION_LENGTH = 140;
  const {comments, filmInfo} = movie;
  const {title, poster, totalRating, release, runtime, description, genre} = filmInfo;
  const {date} = release;

  return `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${date.getFullYear()}</span>
              <span class="film-card__duration">${humanizeRuntime(runtime)}</span>
              <span class="film-card__genre">${genre[0]}</span>
            </p>
            <img src="${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${formatDescription(description, MAX_DESCRIPTION_LENGTH)}</p>
            <span class="film-card__comments">${comments.length} comments</span>
          </a>
          ${createControlsTemplate(movie.userDetails, isDisabled)}
        </article>`;
};

export default class CardView extends AbstractStatefulView {
  constructor(movie) {
    super();
    this._state = CardView.parseDataToState(movie);
  }

  static parseDataToState = (movie) => ({
    movie: movie,
    isDisabled: false
  });

  get template() {
    return createCardTemplate(this._state.movie, this._state.isDisabled);
  }

  _restoreHandlers = () => {};

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };
}
