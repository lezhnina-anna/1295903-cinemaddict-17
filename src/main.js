import {render} from './framework/render';
import UserView from './view/user-view';
import CardListPresenter from './presenter/card-list-presenter';
import {getMoviesData} from './data';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const filterModel = new FilterModel();
const moviesData = getMoviesData();
const cardListPresenter = new CardListPresenter(siteMainElement, moviesData, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesData.moviesModel);

render(new UserView(), siteHeaderElement);
filterPresenter.init();
cardListPresenter.init();
