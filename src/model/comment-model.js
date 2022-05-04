import {generateComment} from '../mock/comment';
import {getRandomInteger} from '../util';

export default class CommentModel {
  comments = Array.from({length: getRandomInteger(0, 20)}, (_, i) => generateComment(i));

  getComments = () => this.comments;
}
