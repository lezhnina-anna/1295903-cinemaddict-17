import {render} from './render';
import UserView from './view/user-view';
import CardListPresenter from './presenter/card-list-presenter';
import {getMoviesData} from './data';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const moviesData = getMoviesData();
const cardListPresenter = new CardListPresenter(siteMainElement, moviesData);

render(new UserView(), siteHeaderElement);
cardListPresenter.init();

