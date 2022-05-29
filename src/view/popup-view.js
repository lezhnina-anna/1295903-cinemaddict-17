import {humanizeMovieDate, humanizeRuntime, humanizeCommentDate} from '../util';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

const createGenresTemplate = (genres) => genres.map((genre) =>
  `<span class="film-details__genre">${genre}</span>`).join('');

const createControlsTemplate = (userDetails) => {
  const ACTIVE_CONTROL_CLASS = 'film-details__control-button--active';
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

  return `<section  class="film-details__controls">
  <button type="button"  class="film-details__control-button film-details__control-button--watchlist ${watchlistClassName}" id="watchlist"
          name="watchlist">Add to watchlist
  </button>
  <button type="button"
           class="film-details__control-button film-details__control-button--watched ${watchedClassName}"
          id="watched" name="watched">Already watched
  </button>
  <button type="button"  class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite"
          name="favorite">Add to favorites
  </button>
</section>`;
};

const createCommentsTemplate = (comments) => comments.map((comment) =>
  `<li class="film-details__comment" >
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
`).join('');

const createEmojiTemplate = (emoji) =>
  `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;

const createPopupTemplate = (movie, commentsList, emoji) => {
  const {comments, filmInfo, userDetails} = movie;
  const {
    title,
    alternativeTitle,
    poster,
    ageRating,
    totalRating,
    release,
    runtime,
    description,
    genre,
    director,
    writers,
    actors
  } = filmInfo;
  const {date, releaseCountry} = release;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(', ')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeMovieDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${humanizeRuntime(runtime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genre.length > 1 ? 'Genres' : 'Genre'}</td>
              <td class="film-details__cell">${createGenresTemplate(genre)}</td>
            </tr>
          </tbody></table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>
      ${createControlsTemplate(userDetails)}
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
            ${createCommentsTemplate(commentsList)}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${ emoji ? createEmojiTemplate(emoji) : ''}
        </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>

  </form>
</section>`;
};

export default class PopupView extends AbstractStatefulView {
  constructor(movie, comments) {
    super();
    this._state = PopupView.parseDataToState({movie, comments});
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._state.movie, this._state.comments, this._state.emoji);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
  };

  static parseDataToState = (data) => ({
    movie: data.movie,
    comments: data.comments.filter((comment) => data.movie.comments.some((movieCommentId) => movieCommentId === comment.id)),
    emoji: '',
    scrollTop: 0
  });

  #setInnerHandlers() {
    const emoji = this.element.querySelectorAll('.film-details__emoji-item');
    for (const emojiItem of emoji) {
      emojiItem.addEventListener('change', this.#emojiClickHandler);
    }

    this.element.addEventListener('scroll', this.#scrollHandler);
  }

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
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

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      emoji: evt.target.value,
    });

    this.element.querySelector(`#emoji-${this._state.emoji}`).checked = true;
    this.#setScroll();
  };

  #scrollHandler = (evt) => {
    this._setState({...this._state, scrollTop: evt.target.scrollTop});
  };

  #setScroll = () => {
    this.element.scrollTop = this._state.scrollTop;
  };

  reset = () => {
    this.updateElement({...this._state, emoji: '', scrollTop: 0});
  };
}
