import {createElement} from '../render';

export default class View {
  #element = null;
  #createTemplate = () => void 0;

  constructor(createTemplate) {
    this.#createTemplate = createTemplate;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return this.#createTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
