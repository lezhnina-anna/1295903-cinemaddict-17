import {render} from '../render';
import CardListView from '../view/card-list-view';
import NavigationView from '../view/navigation-view';
import FilterView from '../view/filter-view';
import CardView from '../view/card-view';
import CardListSectionView from '../view/card-list-section-view';
import PopupView from '../view/popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class CardListPresenter {
  LINE_CARDS_COUNT = 5;
  cardListComponent = new CardListView();
  cardListSectionComponent = new CardListSectionView();

  init = (cardListContainer) => {
    render(new NavigationView(), cardListContainer);
    render(new FilterView(), cardListContainer);
    render(this.cardListSectionComponent, cardListContainer);
    render(this.cardListComponent, this.cardListSectionComponent.getElement());
    render(new PopupView(), document.body);

    for (let i = 0; i < this.LINE_CARDS_COUNT; i++) {
      render(new CardView(), this.cardListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.cardListSectionComponent.getElement());
  };
}
