import {remove, render} from '../framework/render';
import CardListView from '../view/card-list-view';
import SortView from '../view/sort-view';
import CardListSectionView from '../view/card-list-section-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import MoviesTitleView from '../view/movies-title-view';
import MoviePresenter from './movie-presenter';
import {filter, sortByDate, sortByRating} from '../util';
import {ActionType, FilterType, SortType, UpdateType} from '../const';

const LINE_CARDS_COUNT = 5;

export default class CardListPresenter {
  #moviesModel = null;
  #commentsModel = null;
  #filterModel = null;
  #renderedCardCount = LINE_CARDS_COUNT;
  #moviePresenter = new Map();
  #sortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  #cardListContainer = null;
  #cardListComponent = new CardListView();
  #cardListSectionComponent = new CardListSectionView();
  #sortComponent = null;
  #loadMoreButtonComponent = null;
  #movieTitleComponent = null;
  #isLoading = true;

  constructor(cardListContainer, moviesData, filterModel) {
    this.#moviesModel = moviesData.moviesModel;
    this.#commentsModel = moviesData.commentsModel;
    this.#filterModel = filterModel;
    this.#cardListContainer = cardListContainer;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    this.#filterType = this.#filterModel.filter;
    const movies = this.#moviesModel.movies;
    const filteredMovies = filter[this.#filterType](movies);

    switch (this.#sortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortByDate);
      case SortType.RATING:
        return filteredMovies.sort(sortByRating);
    }

    return filteredMovies;
  }

  init = () => {
    this.#renderCardList();
  };

  #handleLoadMoreButtonClick = () => {
    this.movies
      .slice(this.#renderedCardCount, this.#renderedCardCount + LINE_CARDS_COUNT)
      .forEach((movie) => this.#renderMovie(movie));

    this.#renderedCardCount += LINE_CARDS_COUNT;

    if (this.#renderedCardCount >= this.movies.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #handleViewAction = (actionType, update) => {
    switch (actionType) {
      case ActionType.UPDATE_MOVIE:
        this.#moviesModel.updateMovie(UpdateType.PATCH, update);
        break;
      case ActionType.DELETE_COMMENT:
        this.#commentsModel.deleteComment(UpdateType.PATCH, update.commentId);
        this.#moviesModel.updateMovie(UpdateType.PATCH, update.movie);
        break;
      case ActionType.ADD_COMMENT:
        this.#commentsModel.addComment(UpdateType.PATCH, update.comment);
        this.#moviesModel.updateMovie(UpdateType.PATCH, update.movie);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#moviePresenter.get(data.id).init(data, this.comments);
        break;
      case UpdateType.MINOR:
        this.#clearCardList();
        this.#renderCardList();
        break;
      case UpdateType.MAJOR:
        this.#clearCardList({resetRenderedCardCount: true, resetSortType: true});
        this.#renderCardList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearCardList();
        this.#renderCardList();
        break;
    }
  };

  #handlePopupOpen = () => {
    this.#moviePresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#sortType === sortType) {
      return;
    }

    this.#sortType = sortType;
    this.#clearCardList();
    this.#renderCardList();
  };

  #clearCardList = ({resetRenderedCardCount = false, resetSortType = false} = {}) => {
    const moviesCount = this.movies.length;

    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();

    this.#renderedCardCount = resetRenderedCardCount
      ? LINE_CARDS_COUNT
      : Math.min(moviesCount, this.#renderedCardCount);

    remove(this.#loadMoreButtonComponent);
    remove(this.#sortComponent);

    if (this.#movieTitleComponent) {
      remove(this.#movieTitleComponent);
    }

    if (resetSortType) {
      this.#sortType = SortType.DEFAULT;
    }
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#sortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#cardListContainer);
  };

  #renderMovie = (movie) => {
    const moviePresenter = new MoviePresenter(this.#cardListComponent.element, this.#handleViewAction, this.#handlePopupOpen, this.#commentsModel);
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
  };

  #renderLoadMoreButton = () => {
    this.#loadMoreButtonComponent = new ShowMoreButtonView();
    this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);

    render(this.#loadMoreButtonComponent, this.#cardListSectionComponent.element);
  };

  #renderMoviesTitle = () => {
    const isEmptyList = this.movies.length === 0;
    this.#movieTitleComponent = new MoviesTitleView(isEmptyList, this.#filterType, this.#isLoading);
    render(this.#movieTitleComponent, this.#cardListSectionComponent.element);
  };

  #renderCardListWrapper = () => {
    render(this.#cardListSectionComponent, this.#cardListContainer);
    this.#renderMoviesTitle();
    render(this.#cardListComponent, this.#cardListSectionComponent.element);
  };

  #renderCardList = () => {
    this.#renderSort();

    this.#renderCardListWrapper();
    const cardListLength = Math.min(this.movies.length, this.#renderedCardCount);
    for (let i = 0; i < cardListLength; i++) {
      this.#renderMovie(this.movies[i]);
    }

    if (this.movies.length > LINE_CARDS_COUNT) {
      this.#renderLoadMoreButton();
    }
  };
}
