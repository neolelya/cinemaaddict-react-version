import React from 'react';
import styles from './MoviesList.module.css';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import Movie from '../Movie/Movie';
import { movieShape } from '../../utils/shape';

function MoviesList({
  movies,
  onMovieClick,
  onShowMoreButtonClick,
  moviesQuantity,
  onMovieChange,
}) {
  return (
    <section className={styles.list}>
      <h2 className={cx(styles.list, styles.visuallyHidden)}>
        All movies. Upcoming
      </h2>

      <div className={styles.container}>
        {movies.map(movie => (
          <Movie
            onMovieClick={onMovieClick}
            key={movie.id}
            {...movie}
            onMovieChange={onMovieChange}
          />
        ))}
      </div>

      {moviesQuantity > movies.length && (
        <ShowMoreButton onShowMoreButtonClick={onShowMoreButtonClick} />
      )}
    </section>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(movieShape).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onShowMoreButtonClick: PropTypes.func.isRequired,
  moviesQuantity: PropTypes.number.isRequired,
  onMovieChange: PropTypes.func.isRequired,
};

export default MoviesList;
