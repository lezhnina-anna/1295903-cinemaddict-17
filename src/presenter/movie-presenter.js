import CardView from '../view/card-view';
import PopupView from '../view/popup-view';
import {isEscapeKey} from '../util';
import {remove, render, replace} from '../framework/render';

const POPUP_OPEN_CLASSNAME = 'hide-overflow';

export default class MoviePresenter {
  #cardListContainer = null;
  #changeData = null;
  #beforePopupOpen = null;

  #movieComponent = null;
  #popupComponent = null;

  #movie = null;

  constructor(cardListContainer, changeData, beforePopupOpen) {
    this.#cardListContainer = cardListContainer;
    this.#changeData = changeData;
    this.#beforePopupOpen = beforePopupOpen;
  }

  init = (movie, comments) => {
    this.#movie = movie;

    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#movieComponent = new CardView(movie);
    this.#popupComponent = new PopupView(movie, comments);

    this.#movieComponent.setClickHandler(this.#openPopup);
    this.#movieComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#movieComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#movieComponent.setWatchlistClickHandler(this.#handleWatchlistClick);

    if (prevMovieComponent === null || prevPopupComponent === null) {
      render(this.#movieComponent, this.#cardListContainer);
      return;
    }

    if (this.#cardListContainer.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    if (document.body.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
      this.#initPopupHandlers();
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  };

  resetView = () => {
    if (this.#popupComponent !== null && document.body.contains(this.#popupComponent.element)) {
      this.#closePopup();
    }
  };

  #closePopup = () => {
    document.body.classList.remove(POPUP_OPEN_CLASSNAME);
    document.body.removeChild(this.#popupComponent.element);
    this.#popupComponent.removeElement();
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #openPopup = () => {
    this.#beforePopupOpen();
    document.body.appendChild(this.#popupComponent.element);
    document.body.classList.add(POPUP_OPEN_CLASSNAME);

    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#initPopupHandlers();
  };

  #initPopupHandlers = () => {
    this.#popupComponent.setCloseButtonClickHandler(this.#closePopup);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}});
  };

  #handleWatchedClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}});
  };

  #handleWatchlistClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}});
  };
}
