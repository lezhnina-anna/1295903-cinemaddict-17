import {render} from '../render';
import CardListView from '../view/card-list-view';
import NavigationView from '../view/navigation-view';
import FilterView from '../view/filter-view';
import CardView from '../view/card-view';
import CardListSectionView from '../view/card-list-section-view';
import PopupView from '../view/popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class CardListPresenter {
  LINE_CARDS_COUNT = 5;
  #movies = [];
  #comments = [];

  #cardListContainer = null;
  #cardListComponent = new CardListView();
  #cardListSectionComponent = new CardListSectionView();

  init = (cardListContainer, moviesData) => {
    this.#movies = moviesData.movies;
    this.#comments = moviesData.comments;
    this.#cardListContainer = cardListContainer;

    render(new NavigationView(), this.#cardListContainer);
    render(new FilterView(), this.#cardListContainer);
    render(this.#cardListSectionComponent, this.#cardListContainer);
    render(this.#cardListComponent, this.#cardListSectionComponent.element);

    for (let i = 0; i < Math.min(this.#movies.length, this.LINE_CARDS_COUNT); i++) {
      this.#renderMovie(this.#movies[i]);
    }

    render(new ShowMoreButtonView(), this.#cardListSectionComponent.element);
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
