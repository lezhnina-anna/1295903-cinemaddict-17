import {createElement} from '../render';

export default class View {
  constructor(createTemplate) {
    this.createTemplate = createTemplate;
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getTemplate() {
    return this.createTemplate();
  }

  removeElement() {
    this.element = null;
  }
}
