import {render} from './render';
import UserView from './view/user-view';
import CardListPresenter from './presenter/card-list-presenter';
import MovieModel from './model/movie-model';
import {getMoviesData} from "./data";

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const cardListPresenter = new CardListPresenter();
const moviesData = getMoviesData();

render(new UserView(), siteHeaderElement);
cardListPresenter.init(siteMainElement, moviesData);

