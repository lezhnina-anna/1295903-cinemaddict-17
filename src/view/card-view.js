import View from './view';
import {formatDescription, humanizeRuntime} from '../util';

const createCardTemplate = (movie) => {
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
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class CardView extends View {
  constructor(movie) {
    super(() => createCardTemplate(movie));
  }
}
