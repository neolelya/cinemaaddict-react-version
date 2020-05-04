import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Logo.module.css';

function Logo({ smaller }) {
  return (
    <span className={cx(styles.logo, { [styles.smaller]: smaller })}>
      Cinemaddict
    </span>
  );
}

Logo.propTypes = {
  smaller: PropTypes.bool,
};

Logo.defaultProps = {
  smaller: false,
};

export default Logo;
