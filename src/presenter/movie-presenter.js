import CardView from '../view/card-view';
import PopupView from '../view/popup-view';
import {isEscapeKey} from '../util';
import {remove, render, replace} from '../framework/render';
import {ActionType} from '../const';

const POPUP_OPEN_CLASSNAME = 'hide-overflow';

export default class MoviePresenter {
  #cardListContainer = null;
  #changeData = null;
  #beforePopupOpen = null;

  #movieComponent = null;
  #popupComponent = null;

  #movie = null;
  #commentsModel = null;

  constructor(cardListContainer, changeData, beforePopupOpen, commentsModel) {
    this.#cardListContainer = cardListContainer;
    this.#changeData = changeData;
    this.#beforePopupOpen = beforePopupOpen;
    this.#commentsModel = commentsModel;
  }

  init = (movie) => {
    this.#movie = movie;

    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#movieComponent = new CardView(movie);
    this.#popupComponent = new PopupView(movie);

    this.#movieComponent.setClickHandler(this.#openPopup);
    this.#movieComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#movieComponent.setFavoriteClickHandler(() => this.#handleControlClick('favorite'));
    this.#movieComponent.setWatchlistClickHandler(() => this.#handleControlClick('watchlist'));

    if (prevMovieComponent === null || prevPopupComponent === null) {
      render(this.#movieComponent, this.#cardListContainer);
      return;
    }

    if (this.#cardListContainer.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    if (document.body.contains(prevPopupComponent.element)) {
      this.#commentsModel.init(this.#movie.id)
        .finally(() => {
          this.#popupComponent.setComments(this.#commentsModel.comments);
          replace(this.#popupComponent, prevPopupComponent);
          this.#initPopupHandlers();
        });
    }

    remove(prevMovieComponent);
  };

  setDeleting = (id) => {
    this.#popupComponent.updateElement({
      deletingId: id,
    });
  };

  resetView = () => {
    if (this.#popupComponent !== null && document.body.contains(this.#popupComponent.element)) {
      this.#closePopup();
    }
  };

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  };

  #closePopup = () => {
    this.#popupComponent.reset();
    document.body.classList.remove(POPUP_OPEN_CLASSNAME);
    document.body.removeChild(this.#popupComponent.element);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #openPopup = () => {
    this.#beforePopupOpen();
    this.#commentsModel.init(this.#movie.id)
      .finally(() => {
        this.#popupComponent.setComments(this.#commentsModel.comments);
        document.body.appendChild(this.#popupComponent.element);
        document.body.classList.add(POPUP_OPEN_CLASSNAME);

        document.addEventListener('keydown', this.#onEscKeyDown);
        this.#initPopupHandlers();
      });
  };

  #initPopupHandlers = () => {
    this.#popupComponent.setCloseButtonClickHandler(this.#closePopup);
    this.#popupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setFavoriteClickHandler(() => this.#handleControlClick('favorite'));
    this.#popupComponent.setWatchlistClickHandler(() => this.#handleControlClick('watchlist'));
    this.#popupComponent.setDeleteCommentClickHandler(this.#handleDeleteCommentClick);
    this.#popupComponent.setAddCommentHandler(this.#handleAddComment);
  };


  #handleControlClick = (controlName) => {
    this.#changeData(ActionType.UPDATE_MOVIE, {
      ...this.#movie,
      userDetails: {
        ...this.#movie.userDetails,
        [controlName]: !this.#movie.userDetails[controlName],
      }
    });
  };

  #handleWatchedClick = () => {
    const alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    const watchingDate = alreadyWatched ? new Date() : null;
    this.#changeData(ActionType.UPDATE_MOVIE, {
      ...this.#movie,
      userDetails: {...this.#movie.userDetails, alreadyWatched, watchingDate}
    });
  };

  #handleDeleteCommentClick = (id) => {
    this.#changeData(ActionType.DELETE_COMMENT, {
      movie: {
        ...this.#movie,
        comments: [...this.#movie.comments].filter((value) => value.toString() !== id)
      },
      commentId: id
    });
  };

  #handleAddComment = (comment) => {
    this.#changeData(ActionType.ADD_COMMENT, {
      movie: {
        ...this.#movie,
        comments: this.#movie.comments
      },
      comment: {...comment}
    });
  };
}
