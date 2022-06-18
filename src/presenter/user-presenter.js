import {remove, render, replace} from '../framework/render';
import UserView from '../view/user-view';

export default class UserPresenter {
  #userContainer = null;
  #moviesModel = null;
  #userComponent = null;

  constructor(userContainer, moviesModel) {
    this.#userContainer = userContainer;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevUserComponent = this.#userComponent;

    this.#userComponent = new UserView(this.#moviesModel.movies);

    if (prevUserComponent === null) {
      render(this.#userComponent, this.#userContainer);
      return;
    }

    replace(this.#userComponent, prevUserComponent);
    remove(prevUserComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
