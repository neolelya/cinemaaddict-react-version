import React from 'react';
import styles from './ShowMoreButton.module.css';
import PropTypes from 'prop-types';

function ShowMoreButton({ onShowMoreButtonClick }) {
  return (
    <button className={styles.button} onClick={onShowMoreButtonClick}>
      Show more
    </button>
  );
}

ShowMoreButton.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;
