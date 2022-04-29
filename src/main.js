import {render} from './render';
import UserView from './view/user-view';
import CardListPresenter from './presenter/card-list-presenter';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const cardListPresenter = new CardListPresenter();

render(new UserView(), siteHeaderElement);
cardListPresenter.init(siteMainElement);

