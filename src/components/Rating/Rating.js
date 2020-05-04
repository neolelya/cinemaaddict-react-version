import React from 'react';
import styles from './Rating.module.css';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { movieShape } from '../../utils/shape';

function Rating({ movie, onMovieChange, onRatingClick }) {
  const [rating, setRating] = React.useState(movie.personalRating);

  const handleChangeRating = rating => {
    setRating(rating);
    onMovieChange(movie.id, { personalRating: rating });
    onRatingClick();
  };

  return (
    <div className={styles.middle}>
      <section className={styles.wrap}>
        <div className={styles.controls}>
          <button
            className={styles.reset}
            type="button"
            onClick={() => setRating(``)}
          >
            Undo
          </button>
        </div>

        <div className={styles.userScore}>
          <div className={styles.poster}>
            <img
              src={require(`../../` + movie.poster)}
              alt="film-poster"
              className={styles.img}
            />
          </div>

          <section>
            <h3 className={styles.title}>{movie.title}</h3>

            <p className={styles.feelings}>How you feel it?</p>

            <div className={styles.score}>
              {Array(9)
                .fill(``)
                .map((_, i) => (
                  <React.Fragment key={i + 1}>
                    <input
                      type="radio"
                      name="score"
                      className={cx(styles.input, styles.visuallyHidden)}
                      value={i + 1}
                      id={`rating-${i + 1}`}
                      checked={rating === i + 1}
                      onChange={() => handleChangeRating(i + 1)}
                    />
                    <label
                      className={styles.label}
                      htmlFor={`rating-${i + 1}`}
                      onChange={evt => {
                        evt.preventDefault();
                        handleChangeRating(i + 1);
                      }}
                    >
                      {i + 1}
                    </label>
                  </React.Fragment>
                ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

Rating.propTypes = {
  movie: movieShape,
  onMovieChange: PropTypes.func.isRequired,
  onRatingClick: PropTypes.func.isRequired,
};

export default Rating;
