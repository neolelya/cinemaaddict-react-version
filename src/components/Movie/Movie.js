import React from 'react';
import styles from './Movie.module.css';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { formatTime, formatYear } from '../../utils/utils';
import {
  controlButtons,
  ControlButton,
  ButtonAction,
} from '../../utils/constants';

const Movie = props => {
  const {
    id,
    comments,
    title,
    totalRating,
    releaseDate,
    runtime,
    genre,
    poster,
    description,
    onMovieClick,
    onMovieChange,
  } = props;
  return (
    <article className={styles.card}>
      <h3 className={styles.title} onClick={() => onMovieClick(id)}>
        {title}
      </h3>
      <p className={styles.rating}>{totalRating}</p>
      <p>
        <span className={styles.span}>{formatYear(releaseDate)}</span>
        <span className={styles.span}>{formatTime(runtime)}</span>
        <span className={styles.span}>
          {genre.size > 0 ? Array.from(genre)[0] : ``}
        </span>
      </p>
      <img
        src={require(`../../` + poster)}
        alt=""
        className={styles.poster}
        onClick={() => onMovieClick(id)}
      />
      <p className={styles.description}>
        {description.length <= 139
          ? description
              .slice(0, 1)
              .toUpperCase()
              .concat(description.slice(1))
          : description
              .slice(0, 1)
              .toUpperCase()
              .concat(description.slice(1).substr(0, 139), '...')}
      </p>
      <a
        className={styles.comments}
        href="#movie"
        onClick={() => onMovieClick(id)}
      >
        {comments.length} {comments.length === 1 ? ` comment` : ` comments`}
      </a>
      <form className={styles.controls}>
        {controlButtons.map((button, i) => {
          return (
            <button
              key={i + button}
              className={cx(
                styles.controlsItem,
                styles[ControlButton[button]],
                props[button] ? styles.active : '',
              )}
              onClick={evt => {
                evt.preventDefault();
                onMovieChange(id, { [button]: !props[button] });
              }}
            >
              {ButtonAction[button]}
            </button>
          );
        })}
      </form>
    </article>
  );
};

Movie.propTypes = {
  id: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  totalRating: PropTypes.number.isRequired,
  releaseDate: PropTypes.instanceOf(Date).isRequired,
  runtime: PropTypes.number.isRequired,
  genre: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  poster: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onMovieChange: PropTypes.func.isRequired,
};

export default Movie;
