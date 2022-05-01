import {generateDate, getRandomInteger, getUniqueValues} from '../util';
import {COUNTRIES, DESCRIPTION, GENRES, NAMES, POSTERS, TITLES} from '../const';

const generateUniqueArray = (array) => {
  const length = getRandomInteger(1, array.length - 1);
  const result = Array.from({length}, () => array[getRandomInteger(0, array.length - 1)]);

  return getUniqueValues(result);
};

const generateDescription = () => {
  const length = getRandomInteger(1, 5);
  const result = Array.from({length}, () => DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)]);
  return result.join(' ');
};

const generateRuntime = () => {
  const MIN_RUNTIME = 15;
  const MAX_RUNTIME = 250;
  return getRandomInteger(MIN_RUNTIME, MAX_RUNTIME);
};

export const generateMovie = () => {
  const isAlreadyWatched = getRandomInteger(0, 1);
  const watchingDate = isAlreadyWatched ? generateDate(-2000) : '';
  return {
    id: 0,
    comments: [],
    filmInfo: {
      title: TITLES[getRandomInteger(0, TITLES.length - 1)],
      alternativeTitle: 'Laziness Who Sold Themselves',
      totalRating: (getRandomInteger(1, 9) + (getRandomInteger(0, 10) * 0.1)).toFixed(1),
      poster: `./images/posters/${POSTERS[getRandomInteger(0, POSTERS.length - 1)]}`,
      ageRating: 0,
      director: NAMES[getRandomInteger(0, NAMES.length - 1)],
      writers: generateUniqueArray(NAMES),
      actors: generateUniqueArray(NAMES),
      release: {
        date: generateDate(-2000, -1),
        releaseCountry: COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)]
      },
      runtime: generateRuntime(),
      genre: generateUniqueArray(GENRES),
      description: generateDescription()
    },
    userDetails: {
      watchlist: getRandomInteger(0, 1),
      alreadyWatched: isAlreadyWatched,
      watchingDate,
      favorite: getRandomInteger(0, 1)
    }
  };
};
