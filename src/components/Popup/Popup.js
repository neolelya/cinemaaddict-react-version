import React, { useEffect } from 'react';
import styles from './Popup.module.css';
import cx from 'classnames';
import Comments from '../Comments/Comments';
import Rating from '../Rating/Rating';
import { formatDate, formatTime } from '../../utils/utils';
import PropTypes from 'prop-types';
import {
  controlButtons,
  ControlButton,
  ButtonAction,
} from '../../utils/constants';
import { movieShape, commentShape } from '../../utils/shape';

const Popup = props => {
  const {
    movie,
    onPopupClose,
    onMovieChange,
    comments,
    onDeleteCommentClick,
    onAddComment,
  } = props;
  const {
    id,
    title,
    alternativeTitle,
    totalRating,
    poster,
    ageRating,
    director,
    writers,
    actors,
    releaseDate,
    releaseCountry,
    runtime,
    genre,
    description,
    personalRating,
    isHistory,
  } = movie;

  const [isRatingShowed, setRatingShowing] = React.useState(
    !!(!isHistory && !personalRating),
  );

  const handleShowingRating = () => {
    isHistory && personalRating
      ? setRatingShowing(false)
      : setRatingShowing(true);
  };

  useEffect(() => {
    const escKeydownHandler = key => {
      if (key.keyCode === 27) {
        onPopupClose();
      }
    };

    document.addEventListener(`keydown`, escKeydownHandler);

    return () => {
      document.removeEventListener(`keydown`, escKeydownHandler);
    };
  }, [onPopupClose]);

  return (
    <section className={styles.popup}>
      <form className={styles.inner} action="" method="get">
        <div className={styles.top}>
          <div className={styles.close}>
            <button
              className={styles.button}
              onClick={onPopupClose}
              type="button"
            >
              close
            </button>
          </div>
          <div className={styles.infoWrap}>
            <div className={styles.poster}>
              <img
                className={styles.img}
                src={require(`../../` + poster)}
                alt=""
              />

              <p className={styles.age}>{ageRating}+</p>
            </div>

            <div className={styles.info}>
              <div className={styles.infoHead}>
                <div className={styles.titleWrap}>
                  <h3 className={styles.title}>{title}</h3>
                  <p className={styles.original}>{alternativeTitle}</p>
                </div>

                <div className={styles.rating}>
                  <p className={styles.totalRating}>{totalRating}</p>
                  {isHistory && (
                    <p className={styles.userRating}>
                      Your rate {personalRating}
                    </p>
                  )}
                </div>
              </div>

              <table className={styles.table}>
                <tbody>
                  <tr className={styles.row}>
                    <td className={styles.term}>Director</td>
                    <td className={styles.cell}>{director}</td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.term}>Writers</td>
                    <td className={styles.cell}>{[...writers].join(`, `)}</td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.term}>Actors</td>
                    <td className={styles.cell}>{[...actors].join(`, `)}</td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.term}>Release Date</td>
                    <td className={styles.cell}>{formatDate(releaseDate)}</td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.term}>Runtime</td>
                    <td className={styles.cell}>{formatTime(runtime)}</td>
                  </tr>
                  <tr className={styles.row}>
                    <td className={styles.term}>Country</td>
                    <td className={styles.cell}>{releaseCountry}</td>
                  </tr>
                  {genre > 1 && (
                    <tr className={styles.row}>
                      <td className={styles.term}>
                        {genre.size > 1 && `Genres`}
                      </td>
                      <td className={styles.cell}>
                        {Array.from(genre).map((genre, i) => (
                          <span key={genre + i} className={styles.genre}>
                            {genre}
                          </span>
                        ))}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <p className={styles.description}>
                {description.slice(0, 1).toUpperCase()}
                {description.slice(1)}
              </p>
            </div>
          </div>

          <section className={styles.controls}>
            {controlButtons.map(button => {
              return (
                <React.Fragment key={id + button}>
                  <input
                    type="checkbox"
                    className={cx(styles.input, styles.visuallyHidden)}
                    id={controlButtons[button]}
                    name={controlButtons[button]}
                    checked={movie[button]}
                    onChange={onMovieChange}
                  />
                  <label
                    htmlFor={controlButtons[button]}
                    className={cx(styles.label, styles[ControlButton[button]])}
                    onClick={evt => {
                      evt.preventDefault();
                      onMovieChange(id, { [button]: !movie[button] });
                      ControlButton[button] === `history` &&
                        handleShowingRating();
                    }}
                  >
                    {ButtonAction[button]}
                  </label>
                </React.Fragment>
              );
            })}
          </section>
        </div>

        {isRatingShowed && (
          <Rating
            movie={movie}
            onMovieChange={onMovieChange}
            onRatingClick={handleShowingRating}
          />
        )}
        <Comments
          comments={comments}
          movieId={id}
          onDeleteCommentClick={onDeleteCommentClick}
          onAddComment={onAddComment}
        />
      </form>
    </section>
  );
};

Popup.propTypes = {
  movie: movieShape,
  onPopupClose: PropTypes.func.isRequired,
  onMovieChange: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(commentShape).isRequired,
  onDeleteCommentClick: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default Popup;
