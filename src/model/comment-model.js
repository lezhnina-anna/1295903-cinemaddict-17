import Observable from '../framework/observable';

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
  };

  get comments() {
    return this.#comments;
  }

  setComments(updateType, comments) {
    this.#comments = comments;
    this._notify(updateType, comments);
  }

  addComment = async (update, movieId) => {
    try {
      const response = await this.#moviesApiService.addComment(update, movieId);
      this.#comments = [
        ...this.#comments,
        response,
      ];
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  };

  deleteComment = async (commentId) => {
    const index = this.#comments.findIndex((comment) => comment.id.toString() === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#moviesApiService.deleteComment(commentId);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
    } catch(err) {
      throw new Error('Can\'t delete task');
    }
  };
}
