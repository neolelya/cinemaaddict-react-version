import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import avatar from './images/bitmap@2x.png';
import { getProfileRank } from '../../models/profile';
import Logo from '../Logo/Logo';

function Header({ userWatchedMoviesNumber }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Logo />
      </h1>

      <section className={styles.profile}>
        <p className={styles.rating}>
          {getProfileRank(userWatchedMoviesNumber)}
        </p>
        <img
          className={styles.avatar}
          src={avatar}
          alt="Avatar"
          width="35"
          height="35"
        />
      </section>
    </header>
  );
}
Header.propTypes = {
  userWatchedMoviesNumber: PropTypes.number.isRequired,
};
export default Header;
