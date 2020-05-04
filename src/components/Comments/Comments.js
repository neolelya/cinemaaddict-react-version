import React from 'react';
import styles from './Comments.module.css';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import NewComment from '../NewComment/NewComment';
import { commentShape } from '../../utils/shape';

function Comments(props) {
  const { comments, movieId, onDeleteCommentClick, onAddComment } = props;

  return (
    <div className={styles.bottom}>
      <section className={styles.wrap}>
        <h3 className={styles.title}>
          {comments.length === 1 ? `Comment ` : `Comments `}
          <span>{comments.length}</span>
        </h3>

        <ul className={styles.list}>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              message={comment}
              movieId={movieId}
              onDeleteCommentClick={onDeleteCommentClick}
            />
          ))}
        </ul>

        <NewComment onAddComment={onAddComment} movieId={movieId} />
      </section>
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(commentShape).isRequired,
  movieId: PropTypes.string.isRequired,
  onDeleteCommentClick: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default Comments;
