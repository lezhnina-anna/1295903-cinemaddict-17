import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const';

const ACTIVE_SORT_TYPE_CLASS = 'sort__button--active';
const createSortTemplate = (activeSortType) => `<ul class="sort">
    <li><a href="#" class="sort__button ${activeSortType === SortType.DEFAULT ? ACTIVE_SORT_TYPE_CLASS : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${activeSortType === SortType.DATE ? ACTIVE_SORT_TYPE_CLASS : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${activeSortType === SortType.RATING ? ACTIVE_SORT_TYPE_CLASS : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`;

export default class SortView extends AbstractView {
  #sortType = SortType.DEFAULT;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
