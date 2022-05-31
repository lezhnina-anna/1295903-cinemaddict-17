import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const ACTIVE_CLASS = 'main-navigation__item--active';

const createFilterItemTemplate = (filters, currentFilterType) => filters.map((filter) =>
  `<a href="#${filter.type.toLowerCase()}"
        class="main-navigation__item ${currentFilterType === filter.type ? ACTIVE_CLASS : ''}"
        data-filter-type="${filter.type}">
     ${filter.name} ${filter.type !== FilterType.ALL ? `<span class="main-navigation__item-count">${filter.count}</span>` : ''}
  </a>
`).join('');

const createFilterTemplate = (filterItems, currentFilterType) => `<nav class="main-navigation">
      ${createFilterItemTemplate(filterItems, currentFilterType)}
    </nav>`;

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;

    const items = this.element.querySelectorAll('.main-navigation__item');
    for (const item of items) {
      item.addEventListener('click', this.#filterTypeChangeHandler);
    }
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  };
}
