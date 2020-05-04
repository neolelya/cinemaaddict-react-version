import React from 'react';
import styles from './Comment.module.css';
import PropTypes from 'prop-types';
import { formatCommentDate } from '../../utils/utils';
import { commentShape } from '../../utils/shape';

const Comment = ({ message, onDeleteCommentClick, movieId }) => {
  const { id, emotion, comment, date, author } = message;

  const [isDeleting, setDeleting] = React.useState(false);

  const deleteCommentHandler = async (movieId, id) => {
    setDeleting(true);
    await onDeleteCommentClick(movieId, id);
  };

  return (
    <li className={styles.comment}>
      <span className={styles.emotion}>
        <img
          src={require(`../../images/emotions/${emotion}.png`)}
          width="55"
          height="55"
          alt="emoji"
        />
      </span>
      <div>
        <p className={styles.text}>{comment}</p>
        <p className={styles.info}>
          <span className={styles.author}>{author}</span>
          <span className={styles.day}>{formatCommentDate(date)}</span>
          <button
            type="button"
            className={styles.delete}
            onClick={() => {
              deleteCommentHandler(movieId, id);
            }}
            disabled={isDeleting}
          >
            {isDeleting ? `Deleting...` : `Delete`}
          </button>
        </p>
      </div>
    </li>
  );
};

Comment.propTypes = {
  message: commentShape,
  onDeleteCommentClick: PropTypes.func.isRequired,
  movieId: PropTypes.string.isRequired,
};

export default Comment;
