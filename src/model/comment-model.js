import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class CommentModel extends Observable {
  #moviesApiService = null;
  #comments = [];

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  init = async (movieId) => {
    try {
      this.#comments = await this.#moviesApiService.getComments(movieId);
    } catch (err) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT);
  };

  get comments() {
    return this.#comments;
  }

  setComments(updateType, comments) {
    this.#comments = comments;
    this._notify(updateType, comments);
  }

  addComment = (updateType, update) => {
    this.#comments = [
      ...this.#comments,
      update,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, commentId) => {
    const index = this.#comments.findIndex((comment) => comment.id.toString() === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
