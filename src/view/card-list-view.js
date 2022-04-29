import View from './view';

const createCardListTemplate = () => '<div class="films-list__container"></div>';

export default class CardListView extends View {
  constructor() {
    super(createCardListTemplate);
  }
}
