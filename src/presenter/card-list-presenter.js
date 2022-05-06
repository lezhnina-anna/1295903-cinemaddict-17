import {render} from '../render';
import CardListView from '../view/card-list-view';
import NavigationView from '../view/navigation-view';
import FilterView from '../view/filter-view';
import CardView from '../view/card-view';
import CardListSectionView from '../view/card-list-section-view';
import PopupView from '../view/popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import MoviesTitleView from '../view/movies-title-view';

const LINE_CARDS_COUNT = 5;

export default class CardListPresenter {
  #movies = [];
  #comments = [];
  #renderedCardCount = LINE_CARDS_COUNT;

  #cardListContainer = null;
  #cardListComponent = new CardListView();
  #cardListSectionComponent = new CardListSectionView();
  #loadMoreButtonComponent = new ShowMoreButtonView();

  init = (cardListContainer, moviesData) => {
    this.#movies = moviesData.movies;
    this.#comments = moviesData.comments;
    this.#cardListContainer = cardListContainer;
    const isEmptyList = this.#movies.length === 0;

    render(new NavigationView(), this.#cardListContainer);

    if (!isEmptyList) {
      render(new FilterView(), this.#cardListContainer);
    }

    render(this.#cardListSectionComponent, this.#cardListContainer);
    render(new MoviesTitleView(isEmptyList), this.#cardListSectionComponent.element);
    render(this.#cardListComponent, this.#cardListSectionComponent.element);

    for (let i = 0; i < Math.min(this.#movies.length, LINE_CARDS_COUNT); i++) {
      this.#renderMovie(this.#movies[i]);
    }

    if (this.#movies.length > LINE_CARDS_COUNT) {
      render(this.#loadMoreButtonComponent, this.#cardListSectionComponent.element);

      this.#loadMoreButtonComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
    }
  };

  #handleLoadMoreButtonClick = (evt) => {
    evt.preventDefault();

    this.#movies
      .slice(this.#renderedCardCount, this.#renderedCardCount + LINE_CARDS_COUNT)
      .forEach((movie) => this.#renderMovie(movie));

    this.#renderedCardCount += LINE_CARDS_COUNT;

    if (this.#renderedCardCount >= this.#movies.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #renderMovie = (movie) => {
    const POPUP_OPEN_CLASSNAME = 'hide-overflow';
    const movieComponent = new CardView(movie);
    const popupComponent = new PopupView(movie, this.#comments);

    const closePopup = () => {
      document.body.classList.remove(POPUP_OPEN_CLASSNAME);
      document.body.removeChild(popupComponent.element);
      popupComponent.removeElement();
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const openPopup = () => {
      document.body.appendChild(popupComponent.element);
      document.body.classList.add(POPUP_OPEN_CLASSNAME);

      document.addEventListener('keydown', onEscKeyDown);
      popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', closePopup);
    };

    movieComponent.element.querySelector('.film-card__link').addEventListener('click', openPopup);

    render(movieComponent, this.#cardListComponent.element);
  };
}
