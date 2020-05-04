import PropTypes from 'prop-types';

export const movieShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ageRating: PropTypes.number.isRequired,
  alternativeTitle: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  genre: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  isFavorites: PropTypes.bool.isRequired,
  isHistory: PropTypes.bool.isRequired,
  isWatchlist: PropTypes.bool.isRequired,
  personalRating: PropTypes.number,
  poster: PropTypes.string.isRequired,
  releaseCountry: PropTypes.string.isRequired,
  releaseDate: PropTypes.instanceOf(Date).isRequired,
  runtime: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  totalRating: PropTypes.number.isRequired,
  watchingDate: PropTypes.instanceOf(Date),
  writers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}).isRequired;

export const commentShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  emotion: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  author: PropTypes.string.isRequired,
}).isRequired;

export const menuItemShape = PropTypes.shape({
  name: PropTypes.string,
  count: PropTypes.number,
});
