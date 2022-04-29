import View from './view';

const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends View {
  constructor() {
    super(createShowMoreButtonTemplate);
  }
}
