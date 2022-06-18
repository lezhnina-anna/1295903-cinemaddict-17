import CardListPresenter from './presenter/card-list-presenter';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import MovieModel from './model/movie-model';
import MovieApiService from './api-services/movie-api-service';
import CommentModel from './model/comment-model';
import FooterStatisticsPresenter from './presenter/footer-statistics-presenter';
import UserPresenter from './presenter/user-presenter';

const AUTHORIZATION = 'Basic IQTVDaGlHce96Tde';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerStatisticsElement = document.querySelector('.footer__statistics');
const filterModel = new FilterModel();
const apiService = new MovieApiService(END_POINT, AUTHORIZATION);
const moviesData = {
  moviesModel: new MovieModel(apiService),
  commentsModel: new CommentModel(apiService)
};
const cardListPresenter = new CardListPresenter(siteMainElement, moviesData, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesData.moviesModel);
const footerStatisticsPresenter = new FooterStatisticsPresenter(footerStatisticsElement, moviesData.moviesModel);
const userPresenter = new UserPresenter(siteHeaderElement, moviesData.moviesModel);

userPresenter.init();
filterPresenter.init();
cardListPresenter.init();
footerStatisticsPresenter.init();
moviesData.moviesModel.init();
