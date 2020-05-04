import React from 'react';
import styles from './Sorting.module.css';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { SortType } from '../../utils/constants';

function Sorting({ onSortingItemClick, sortingItem }) {
  return (
    <ul className={styles.sort}>
      <li>
        <a
          href="#default"
          className={cx(styles.button, {
            [styles.active]: sortingItem === SortType.DEFAULT,
          })}
          onClick={() => onSortingItemClick(SortType.DEFAULT)}
        >
          Sort by default
        </a>
      </li>
      <li>
        <a
          href="#date"
          className={cx(styles.button, {
            [styles.active]: sortingItem === SortType.DATE,
          })}
          onClick={() => onSortingItemClick(SortType.DATE)}
        >
          Sort by date
        </a>
      </li>
      <li>
        <a
          href="#rating"
          className={cx(styles.button, {
            [styles.active]: sortingItem === SortType.RATING,
          })}
          onClick={() => onSortingItemClick(SortType.RATING)}
        >
          Sort by rating
        </a>
      </li>
    </ul>
  );
}

Sorting.propTypes = {
  onSortingItemClick: PropTypes.func.isRequired,
  sortingItem: PropTypes.string.isRequired,
};

export default Sorting;
