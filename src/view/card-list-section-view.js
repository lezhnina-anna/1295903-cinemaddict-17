import AbstractView from '../framework/view/abstract-view';

const createCardListSectionTemplate = () => '<section class="films-list"></section>';

export default class CardListSectionView extends AbstractView {
  get template() {
    return createCardListSectionTemplate();
  }
}
