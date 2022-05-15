import {render} from '../framework/render';
import CardListView from '../view/card-list-view';
import NavigationView from '../view/navigation-view';
import FilterView from '../view/filter-view';
import CardListSectionView from '../view/card-list-section-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import MoviesTitleView from '../view/movies-title-view';
import MoviePresenter from './movie-presenter';
import {updateItem} from '../util';

const LINE_CARDS_COUNT = 5;

export default class CardListPresenter {
  #moviesData = {};
  #movies = [];
  #comments = [];
  #renderedCardCount = LINE_CARDS_COUNT;
  #isEmptyList = true;
  #moviePresenter = new Map();

  #cardListContainer = null;
  #cardListComponent = new CardListView();
  #cardListSectionComponent = new CardListSectionView();
  #loadMoreButtonComponent = new ShowMoreButtonView();
  #navigationComponent = new NavigationView();
  #filterComponent = new FilterView();

  constructor(cardListContainer, moviesData) {
    this.#moviesData = moviesData;
    this.#cardListContainer = cardListContainer;
  }

  init = () => {
    this.#movies = [...this.#moviesData.movies];
    this.#comments = [...this.#moviesData.comments];
    this.#isEmptyList = this.#movies.length === 0;

    this.#renderCardList();
  };

  #handleLoadMoreButtonClick = () => {
    this.#movies
      .slice(this.#renderedCardCount, this.#renderedCardCount + LINE_CARDS_COUNT)
      .forEach((movie) => this.#renderMovie(movie));

    this.#renderedCardCount += LINE_CARDS_COUNT;

    if (this.#renderedCardCount >= this.#movies.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #handleMovieChange = (updatedMovie) => {
    this.#movies = updateItem(this.#movies, updatedMovie);
    this.#moviePresenter.get(updatedMovie.id).init(updatedMovie, this.#comments);
  };

  #handlePopupOpen = () => {
    this.#moviePresenter.forEach((presenter) => presenter.resetView());
  };

  #renderNavigation = () => {
    render(this.#navigationComponent, this.#cardListContainer);
  };

  #renderFilter = () => {
    render(this.#filterComponent, this.#cardListContainer);
  };

  #renderMovie = (movie) => {
    const moviePresenter = new MoviePresenter(this.#cardListComponent.element, this.#handleMovieChange, this.#handlePopupOpen);
    moviePresenter.init(movie, this.#comments);
    this.#moviePresenter.set(movie.id, moviePresenter);
  };

  #renderLoadMoreButton = () => {
    render(this.#loadMoreButtonComponent, this.#cardListSectionComponent.element);

    this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
  };

  #renderCardListWrapper = () => {
    render(this.#cardListSectionComponent, this.#cardListContainer);
    render(new MoviesTitleView(this.#isEmptyList), this.#cardListSectionComponent.element);
    render(this.#cardListComponent, this.#cardListSectionComponent.element);
  };

  #renderCardList = () => {
    this.#renderNavigation();

    if (!this.#isEmptyList) {
      this.#renderFilter();
    }

    this.#renderCardListWrapper();

    const cardListLength = Math.min(this.#movies.length, LINE_CARDS_COUNT);
    for (let i = 0; i < cardListLength; i++) {
      this.#renderMovie(this.#movies[i]);
    }

    if (this.#movies.length > LINE_CARDS_COUNT) {
      this.#renderLoadMoreButton();
    }
  };
}
