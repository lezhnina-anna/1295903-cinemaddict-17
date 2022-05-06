import View from './view';

const createCardListSectionTemplate = () => '<section class="films-list"></section>';

export default class CardListSectionView extends View {
  constructor() {
    super(createCardListSectionTemplate);
  }
}
