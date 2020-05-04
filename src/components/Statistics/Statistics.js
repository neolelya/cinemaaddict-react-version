import React from 'react';
import styles from './Statistics.module.css';
import cx from 'classnames';
import avatar from '../Header/images/bitmap@2x.png';
import PropTypes from 'prop-types';
import StatisticsChart from '../StatistcsChart/StatisticsChart';
import { getProfileRank } from '../../models/profile';
import { Period } from '../../utils/constants';
import { movieShape } from '../../utils/shape';

const getUserMoviesStats = (movies, period) => {
  const moviesFromPeriod = movies.filter(
    movie => movie.isHistory && new Date(movie.watchingDate) >= period,
  );

  return {
    moviesNumber: getMoviesNumber(moviesFromPeriod),
    duration: getMoviesDuration(moviesFromPeriod),
    genres: getMoviesGenres(moviesFromPeriod),
  };
};

const getMoviesNumber = movies => {
  return movies.length;
};

const getMoviesDuration = movies => {
  return movies.reduce((acc, it) => {
    return acc + it.runtime;
  }, 0);
};

const getMoviesGenres = movies => {
  const genresCounter = {};
  const genres = [];
  movies.forEach(movie => {
    const genresArray = Array.from(movie.genre.keys());
    genresArray.forEach(genre => {
      genresCounter[genre] = (genresCounter[genre] || 0) + 1;
    });
  });
  Object.keys(genresCounter).forEach(genre => {
    genres.push({ name: genre, moviesNumber: genresCounter[genre] });
  });
  return genres.sort((a, b) => b.moviesNumber - a.moviesNumber);
};

const MenuItem = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const menuLabels = [
  { label: `All time`, value: MenuItem.ALL_TIME, duration: Period.ALL_TIME },
  {
    label: `Today`,
    value: MenuItem.TODAY,
    duration: Period.TODAY,
  },
  {
    label: `Week`,
    value: MenuItem.WEEK,
    duration: Period.WEEK,
  },
  {
    label: `Month`,
    value: MenuItem.MONTH,
    duration: Period.MONTH,
  },
  {
    label: `Year`,
    value: MenuItem.YEAR,
    duration: Period.YEAR,
  },
];

function Statistics({ movies, userWatchedMoviesNumber }) {
  const [menuItem, setItem] = React.useState(menuLabels[0]);

  let userMoviesStats = getUserMoviesStats(movies, menuItem.duration);
  let hours = Math.floor(userMoviesStats.duration / 60);
  let minutes = userMoviesStats.duration % hours;

  return (
    <section className={styles.statistic}>
      <p className={styles.rank}>
        Your rank
        <img
          className={styles.img}
          src={avatar}
          alt="Avatar"
          width="35"
          height="35"
        />
        <span className={styles.rankLabel}>
          {getProfileRank(userWatchedMoviesNumber)}
        </span>
      </p>

      <form
        action="https://echo.htmlacademy.ru/"
        method="get"
        className={styles.filters}
      >
        <p className={styles.description}>Show stats:</p>

        {menuLabels.map(item => (
          <React.Fragment key={item.value}>
            <input
              type="radio"
              className={cx(styles.input, styles.visuallyHidden)}
              name="statistic-filter"
              id={`statistic-${item.value}`}
              value={item.value}
              onChange={() => setItem(item)}
              checked={menuItem === item}
            />
            <label htmlFor={`statistic-${item.value}`} className={styles.label}>
              {item.label}
            </label>
          </React.Fragment>
        ))}
      </form>

      <ul className={styles.list}>
        <li>
          <h4 className={styles.itemTitle}>You watched</h4>
          <p className={styles.itemText}>
            {userMoviesStats.moviesNumber ? userMoviesStats.moviesNumber : `0`}
            <span className={styles.itemDescription}>movies</span>
          </p>
        </li>
        <li>
          <h4 className={styles.itemTitle}>Total duration</h4>
          <p className={styles.itemText}>
            {userMoviesStats.duration ? hours : `0`}
            <span className={styles.itemDescription}>h</span>
            {userMoviesStats.duration ? minutes : `0`}
            <span className={styles.itemDescription}>m</span>
          </p>
        </li>
        <li>
          <h4 className={styles.itemTitle}>Top genre</h4>
          <p className={styles.itemText}>
            {userMoviesStats.genres.length
              ? userMoviesStats.genres[0].name
              : `-`}
          </p>
        </li>
      </ul>

      <div className={styles.wrap}>
        <StatisticsChart genres={userMoviesStats.genres} />
      </div>
    </section>
  );
}

Statistics.propTypes = {
  movies: PropTypes.arrayOf(movieShape).isRequired,
  userWatchedMoviesNumber: PropTypes.number.isRequired,
};

export default Statistics;
