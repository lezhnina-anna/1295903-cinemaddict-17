import {remove, render, replace} from '../framework/render';
import FooterStatisticsView from '../view/footer-statistics-view';

export default class FooterStatisticsPresenter {
  #footerStatisticsContainer = null;
  #moviesModel = null;
  #footerStatisticsComponent = null;

  constructor(footerStatisticsContainer, moviesModel) {
    this.#footerStatisticsContainer = footerStatisticsContainer;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevFooterStatisticsComponent = this.#footerStatisticsComponent;

    this.#footerStatisticsComponent = new FooterStatisticsView(this.#moviesModel.movies);

    if (prevFooterStatisticsComponent === null) {
      render(this.#footerStatisticsComponent, this.#footerStatisticsContainer);
      return;
    }

    replace(this.#footerStatisticsComponent, prevFooterStatisticsComponent);
    remove(prevFooterStatisticsComponent);
  };


  #handleModelEvent = () => {
    this.init();
  };
}
