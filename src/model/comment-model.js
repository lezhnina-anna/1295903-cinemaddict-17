import {generateComment} from '../mock/comment';
import {getRandomInteger} from '../util';
import Observable from '../framework/observable';

export default class CommentModel extends Observable {
  #comments = Array.from({length: getRandomInteger(0, 20)}, (_, i) => generateComment(i));

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
