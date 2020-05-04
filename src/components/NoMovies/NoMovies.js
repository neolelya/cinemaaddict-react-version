import React from 'react';
import PropTypes from 'prop-types';
import styles from './NoMovies.module.css';

function NoMovies({ isLoaded }) {
  return (
    <section className={styles.list}>
      <h2 className={styles.title}>
        {isLoaded ? `There are no movies in our database` : `Loading...`}
      </h2>
    </section>
  );
}

NoMovies.propTypes = {
  isLoaded: PropTypes.bool,
};

NoMovies.defaultProps = {
  isLoaded: false,
};

export default NoMovies;
