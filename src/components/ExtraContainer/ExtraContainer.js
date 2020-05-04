import React from 'react';
import PropTypes from 'prop-types';
import styles from './ExtraContainer.module.css';
import Movie from '../Movie/Movie';
import { movieShape } from '../../utils/shape';

function ExtraContainer({ movies, title, onMovieClick, onMovieChange }) {
  return (
    <section className={styles.list}>
      <h2>{title}</h2>

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
    </section>
  );
}

ExtraContainer.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(movieShape).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onMovieChange: PropTypes.func.isRequired,
};

export default ExtraContainer;
