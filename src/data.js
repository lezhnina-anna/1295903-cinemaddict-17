import MovieModel from './model/movie-model';
import CommentModel from './model/comment-model';
import {getRandomInteger} from './util';

const getMoviesData = () => {
  const movies = [...new MovieModel().getMovies()];
  const comments = [...new CommentModel().getComments()];

  for (const movie of movies) {
    const count = getRandomInteger(0, comments.length - 1);
    [...Array(count).keys()].forEach(() => {
      const randomId = comments[getRandomInteger(0, comments.length - 1)].id;
      if (!movie.comments.includes(randomId)) {
        movie.comments.push(randomId);
      }
    });
  }

  return {movies, comments};
};

export {getMoviesData};
