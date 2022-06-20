import {humanizeMovieDate, humanizeRuntime, humanizeCommentDate} from '../util/movie';
import {isEscapeKey, isEnterKey, isControlKey, isCommandKey} from '../util/common';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import he from 'he';

const createGenresTemplate = (genres) => genres.map((genre) =>
  `<span class="film-details__genre">${genre}</span>`).join('');

const createControlsTemplate = (userDetails, isDisabled) => {
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
          name="watchlist" ${isDisabled ? 'disabled' : ''}>Add to watchlist
  </button>
  <button type="button"
           class="film-details__control-button film-details__control-button--watched ${watchedClassName}"
          id="watched" name="watched" ${isDisabled ? 'disabled' : ''}>Already watched
  </button>
  <button type="button"  class="film-details__control-button film-details__control-button--favorite ${favoriteClassName}" id="favorite"
          name="favorite" ${isDisabled ? 'disabled' : ''}>Add to favorites
  </button>
</section>`;
};

const createCommentsTemplate = (comments, deletingId, isDisabled) => comments.map((comment) =>
  `<li class="film-details__comment" >
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
          <button class="film-details__comment-delete" data-id="${comment.id}" ${deletingId === comment.id || isDisabled ? 'disabled' : ''}>
           ${deletingId === comment.id ? 'Deleting...' : 'Delete'}
          </button>
        </p>
      </div>
    </li>
  `).join('');

const createEmojiTemplate = (emoji) =>
  `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;

const createPopupTemplate = (movie, commentsList, emoji, comment, deletingId, isDisabled) => {
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
      ${createControlsTemplate(userDetails, isDisabled)}
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
            ${createCommentsTemplate(commentsList, deletingId, isDisabled)}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${emoji ? createEmojiTemplate(emoji) : ''}
        </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled' : ''}>${he.encode(comment)}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isDisabled ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isDisabled ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isDisabled ? 'disabled' : ''}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isDisabled ? 'disabled' : ''}>
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

const SHAKE_CLASS_NAME = 'shake';
const SHAKE_ANIMATION_TIMEOUT = 600;

export default class PopupView extends AbstractStatefulView {
  constructor(movie) {
    super();
    this._state = PopupView.parseDataToState(movie, scroll);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._state.movie, this._state.comments, this._state.emoji, this._state.comment, this._state.deletingId, this._state.isDisabled);
  }

  get scroll() {
    return this._state.scrollTop;
  }

  set scroll(scroll) {
    this.element.scrollTop = scroll;
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
  };

  reset = () => {
    this.updateElement({...this._state, emoji: '', scrollTop: 0, comment: ''});
  };

  setComments = (comments) => {
    this.updateElement({comments: comments});
  };

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

  setDeleteCommentClickHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    const comments = this.element.querySelectorAll('.film-details__comment-delete');
    for (const comment of comments) {
      comment.addEventListener('click', this.#deleteCommentClickHandler);
    }
  };

  setAddCommentHandler = (callback) => {
    this._callback.addComment = callback;
  };

  setAbortingForm = () => {
    this.updateElement({
      isDisabled: false,
    });

    this.scroll = this._state.scrollTop;
    this.#shake(this.element.querySelector('.film-details__new-comment'));
  };

  setAbortingUserAction = () => {
    this.updateElement({
      isDisabled: false,
    });

    this.scroll = this._state.scrollTop;
    const lastUserActionButton = this.element.querySelector(`.film-details__control-button--${this._state.lastUserAction}`);
    this.#shake(lastUserActionButton);
  };

  setAbortingDelete = () => {
    const deletingId = this._state.deletingId;
    this.updateElement({
      isDisabled: false,
      deletingId: -1
    });

    const clickedDeletingElement = this.element.querySelector(`[data-id="${deletingId}"]`);
    this.scroll = this._state.scrollTop;
    this.#shake(clickedDeletingElement);
  };

  onSuccessFormSend = () => {
    this.updateElement({...this._state, comment: '', emoji: ''});
    this.scroll = this._state.scrollTop;
  };

  #setInnerHandlers() {
    const emoji = this.element.querySelectorAll('.film-details__emoji-item');
    for (const emojiItem of emoji) {
      emojiItem.addEventListener('change', this.#emojiClickHandler);
    }

    const commentInputElement = this.element.querySelector('.film-details__comment-input');
    commentInputElement.addEventListener('keyup', this.#commentChangeHandler);
    commentInputElement.addEventListener('keydown', this.#commentKeydownHandler);

    this.element.addEventListener('scroll', this.#scrollHandler);
  }

  #shake(element) {
    element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  #closeButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._setState({...this._state, lastUserAction: 'favorite'});
    this._callback.favoriteClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._setState({...this._state, lastUserAction: 'watched'});
    this._callback.watchedClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._setState({...this._state, lastUserAction: 'watchlist'});
    this._callback.watchlistClick();
  };

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      emoji: evt.target.value,
    });

    this.element.querySelector(`#emoji-${this._state.emoji}`).checked = true;
    this.scroll = this._state.scrollTop;
  };

  #commentKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }

    if (isEnterKey(evt) && (isControlKey(evt) || isCommandKey(evt))) {
      this.#addCommentHandler();
    }
  };

  #commentChangeHandler = (evt) => {
    this._setState({
      comment: evt.target.value
    });
  };

  #addCommentHandler = () => {
    this._callback.addComment({
      comment: this._state.comment,
      emotion: this._state.emoji,
      date: new Date(),
      author: 'my name'
    });
  };

  #scrollHandler = (evt) => {
    this._setState({...this._state, scrollTop: evt.target.scrollTop});
  };

  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteCommentClick(evt.target.dataset.id);
  };

  static parseDataToState = (movie, scroll) => ({
    movie: movie,
    comments: [],
    emoji: '',
    scrollTop: scroll,
    comment: '',
    deletingId: -1,
    isDisabled: false,
    lastUserAction: null
  });
}
