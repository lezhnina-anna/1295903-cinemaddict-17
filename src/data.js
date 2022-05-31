import MovieModel from './model/movie-model';
import CommentModel from './model/comment-model';
import {getRandomInteger} from './util';

const getMoviesData = () => {
  const moviesModel = new MovieModel();
  const commentsModel = new CommentModel();

  for (const movie of moviesModel.movies) {
    const count = getRandomInteger(0, commentsModel.comments.length - 1);
    for (let i = 0; i < count; i++) {
      const randomId = commentsModel.comments[getRandomInteger(0, commentsModel.comments.length - 1)].id;
      if (!movie.comments.includes(randomId)) {
        movie.comments.push(randomId);
      }
    }

    moviesModel.updateMovie('', movie);
  }

  return {moviesModel, commentsModel};
};

export {getMoviesData};
