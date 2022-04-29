import View from './view';

const createCardListSectionTemplate = () => `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
</section>`;

export default class CardListSectionView extends View {
  constructor() {
    super(createCardListSectionTemplate);
  }
}
