import Observable from '../framework/observable';
import {FilterType} from '../const';

export default class FilterModel extends Observable {
  #filter = FilterType.ALL;

  get moviesFilter() {
    return this.#filter;
  }

  setMoviesFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
