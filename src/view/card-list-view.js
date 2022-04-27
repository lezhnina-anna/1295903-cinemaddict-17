import {createElement} from '../render.js';

const createCardListTemplate = () => '<div class="films-list__container"></div>';

export default class CardListView {
  getTemplate() {
    return createCardListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
