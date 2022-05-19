import {remove, render} from '../framework/render';
import CardListView from '../view/card-list-view';
import NavigationView from '../view/navigation-view';
import SortView from '../view/sort-view';
import CardListSectionView from '../view/card-list-section-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import MoviesTitleView from '../view/movies-title-view';
import MoviePresenter from './movie-presenter';
import {sortByDate, sortByRating, updateItem} from '../util';
import {SortType} from '../const';

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
  #sortComponent = new SortView(SortType.DEFAULT);

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
    this.#moviesData.movies = updateItem(this.#moviesData.movies, updatedMovie);
    this.#moviePresenter.get(updatedMovie.id).init(updatedMovie, this.#comments);
  };

  #handlePopupOpen = () => {
    this.#moviePresenter.forEach((presenter) => presenter.resetView());
  };

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#movies.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#movies.sort(sortByRating);
        break;
      default:
        this.#movies = [...this.#moviesData.movies];
    }

    this.#sortComponent.sortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortComponent.sortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearCardListContent();
    this.#renderCardListContent();
  };

  #clearCardListContent = () => {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#renderedCardCount = LINE_CARDS_COUNT;
    remove(this.#loadMoreButtonComponent);
    remove(this.#sortComponent);
  };

  #renderNavigation = () => {
    render(this.#navigationComponent, this.#cardListContainer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#cardListContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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

  #renderCardListContent = () => {
    if (!this.#isEmptyList) {
      this.#renderSort();
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

  #renderCardList = () => {
    this.#renderNavigation();
    this.#renderCardListContent();
  };
}
