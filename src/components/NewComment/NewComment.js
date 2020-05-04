import React, { useEffect } from 'react';
import cx from 'classnames';
import styles from '../NewComment/NewComment.module.css';
import PropTypes from 'prop-types';
import { EMOTIONS } from '../../utils/constants';

const emotionRef = React.createRef();
const commentRef = React.createRef();

const NewComment = props => {
  const { onAddComment, movieId } = props;

  const [selectedEmotion, selectEmotion] = React.useState(``);
  const [isSending, setSending] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const clearComment = () => {
    selectEmotion(``);
    commentRef.current.value = ``;
    setSending(false);
  };

  useEffect(() => {
    const sendCommentHandler = async () => {
      try {
        setSending(true);
        setError(false);
        await onAddComment(movieId, {
          comment: commentRef.current.value.toString(),
          emotion: selectedEmotion,
          date: new Date(),
        });
      } catch (error) {
        setTimeout(() => {
          setError(false);
        }, 1000);
        setError(true);
      }
    };

    const ctrlEnterKeydownHandler = async key => {
      if (
        key.keyCode === 13 &&
        key.ctrlKey &&
        selectedEmotion &&
        commentRef.current.value
      ) {
        await sendCommentHandler();
        clearComment();
      }
    };

    document.addEventListener(`keydown`, ctrlEnterKeydownHandler);

    return () => {
      document.removeEventListener(`keydown`, ctrlEnterKeydownHandler);
    };
  }, [selectedEmotion, movieId, onAddComment, isSending]);

  return (
    <div className={cx(styles.new, { [styles.errorAnimation]: isError })}>
      <div htmlFor="add-emoji" className={styles.addEmotion} ref={emotionRef}>
        {selectedEmotion && (
          <img
            src={require(`../../images/emotions/${selectedEmotion}.png`)}
            width="100%"
            height="100%"
            alt="emoji"
          />
        )}
      </div>

      <label className={styles.commentLabel}>
        <textarea
          className={styles.input}
          placeholder="Select reaction below and write comment here"
          name="comment"
          ref={commentRef}
          readOnly={!!isSending}
        ></textarea>
      </label>

      <div className={styles.emotions}>
        {EMOTIONS.map((emotion, index) => {
          return (
            <React.Fragment key={index + 1 + emotion}>
              <input
                className={cx(styles.item, styles.visuallyHidden)}
                name="comment-emoji"
                type="radio"
                id={`emoji-${emotion}`}
                value={emotion}
                checked={!!selectedEmotion && !!!isSending}
                readOnly={true}
                disabled={!!isSending}
              />
              <label className={styles.label} htmlFor={`emoji-${emotion}`}>
                <img
                  onClick={() => {
                    selectEmotion(emotion);
                  }}
                  src={require(`../../images/emotions/${emotion}.png`)}
                  width="30"
                  height="30"
                  alt="emoji"
                />
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

NewComment.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  movieId: PropTypes.string.isRequired,
};

export default NewComment;
