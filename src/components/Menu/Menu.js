import React from 'react';
import styles from './Menu.module.css';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ViewMode } from '../../utils/constants';
import { menuItemShape } from '../../utils/shape';

function Menu({ filteredMoviesQuantity, onMenuItemClick, menuItem }) {
  return (
    <nav className={styles.navigation}>
      <a
        href="#all"
        className={cx(styles.item, {
          [styles.active]: menuItem === ViewMode.ALL,
        })}
        onClick={() => onMenuItemClick(ViewMode.ALL)}
      >
        All movies
      </a>
      <a
        href="#watchlist"
        className={cx(styles.item, {
          [styles.active]: menuItem === ViewMode.WATCHLIST,
        })}
        onClick={() => onMenuItemClick(ViewMode.WATCHLIST)}
      >
        Watchlist
        <span className={styles.count}>
          {filteredMoviesQuantity.watchlist.count}
        </span>
      </a>
      <a
        href="#history"
        className={cx(styles.item, {
          [styles.active]: menuItem === ViewMode.HISTORY,
        })}
        onClick={() => onMenuItemClick(ViewMode.HISTORY)}
      >
        History
        <span className={styles.count}>
          {filteredMoviesQuantity.history.count}
        </span>
      </a>
      <a
        href="#favorites"
        className={cx(styles.item, {
          [styles.active]: menuItem === ViewMode.FAVORITES,
        })}
        onClick={() => onMenuItemClick(ViewMode.FAVORITES)}
      >
        Favorites
        <span className={styles.count}>
          {filteredMoviesQuantity.favorites.count}
        </span>
      </a>
      <a
        href="#stats"
        className={cx(styles.item, styles.additional, {
          [styles.active]: menuItem === ViewMode.STATS,
        })}
        onClick={() => onMenuItemClick(ViewMode.STATS)}
      >
        Stats
      </a>
    </nav>
  );
}

Menu.propTypes = {
  filteredMoviesQuantity: PropTypes.shape({
    all: menuItemShape,
    watchlist: menuItemShape,
    history: menuItemShape,
    favorites: menuItemShape,
  }).isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
  menuItem: PropTypes.string.isRequired,
};

export default Menu;
