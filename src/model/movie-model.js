import {generateMovie} from '../mock/movie';
import Observable from '../framework/observable';

export default class MovieModel extends Observable {
  #movies = Array.from({length: 11}, generateMovie);

  get movies() {
    return this.#movies;
  }

  setMovies(updateType, movies) {
    this.#movies = movies;
    this._notify(updateType, movies);
  }

  updateMovie = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      update,
      ...this.#movies.slice(index + 1)
    ];

    this._notify(updateType, update);
  };
}
