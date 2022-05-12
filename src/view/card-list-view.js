import AbstractView from '../framework/view/abstract-view';

const createCardListTemplate = () => '<div class="films-list__container"></div>';

export default class CardListView extends AbstractView {
  get template() {
    return createCardListTemplate();
  }
}
