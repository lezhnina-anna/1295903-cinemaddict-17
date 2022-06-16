import {render} from './framework/render';
import UserView from './view/user-view';
import CardListPresenter from './presenter/card-list-presenter';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import MovieModel from './model/movie-model';
import MovieApiService from './api-services/movie-api-service';
import CommentModel from './model/comment-model';

const AUTHORIZATION = 'Basic IQTVDaGlHce96Tde';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const filterModel = new FilterModel();
const apiService = new MovieApiService(END_POINT, AUTHORIZATION);
const moviesData = {
  moviesModel: new MovieModel(apiService),
  commentsModel: new CommentModel(apiService)
};
const cardListPresenter = new CardListPresenter(siteMainElement, moviesData, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesData.moviesModel);

render(new UserView(), siteHeaderElement);
filterPresenter.init();
cardListPresenter.init();
moviesData.moviesModel.init();
