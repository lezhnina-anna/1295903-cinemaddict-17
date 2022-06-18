import AbstractView from '../framework/view/abstract-view';

const MIN_COUNT_FOR_NOVICE = 1;
const MIN_COUNT_FOR_FAN = 11;
const MIN_COUNT_FOR_MOVIE_BUFF = 21;

const createUserTemplate = (watchedCount) => {
  let rank = '';
  if (watchedCount >= MIN_COUNT_FOR_NOVICE) {
    rank = 'Novice';
  }
  if (watchedCount >= MIN_COUNT_FOR_FAN) {
    rank = 'Fan';
  }
  if (watchedCount >= MIN_COUNT_FOR_MOVIE_BUFF) {
    rank = 'Movie Buff';
  }

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserView extends AbstractView {
  #watchedCount = 0;

  constructor(movies) {
    super();
    this.#watchedCount = movies.filter((movie) => movie.userDetails.alreadyWatched).length;
  }

  get template() {
    return createUserTemplate(this.#watchedCount);
  }
}
