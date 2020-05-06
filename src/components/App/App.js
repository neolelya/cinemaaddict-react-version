import React from 'react';
import styles from './App.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NoMovies from '../NoMovies/NoMovies';
import Menu from '../Menu/Menu';
import Sorting from '../Sorting/Sorting';
import MoviesList from '../MoviesList/MoviesList';
import ExtraContainer from '../ExtraContainer/ExtraContainer';
import Statistics from '../Statistics/Statistics';
import API from '../../api';
import Movies from '../../models/movies';
import Movie from '../../models/movie';
import {
  FilterName,
  LoadState,
  SortType,
  ViewMode,
} from '../../utils/constants';
import Popup from '../Popup/Popup';

const MOVIES_ON_START = 5;
const AUTHORIZATION = `Basic 8rklKE83521erYEMp`;
const URL = `https://htmlacademy-es-10.appspot.com/cinemaddict`;
const api = new API(URL, AUTHORIZATION);
const movieModel = new Movies();

function App() {
  const [movies, setMovies] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [viewMode, setMode] = React.useState(ViewMode.ALL);
  const [loadMode, setLoadingState] = React.useState(LoadState.LOADING);
  const [sortingMode, setSortingMode] = React.useState(SortType.DEFAULT);
  const [isPopupOpened, setPopupMode] = React.useState(false);
  const [openedMovie, setOpenedMovie] = React.useState([]);
  const [moviesOnStart, setWatchMoreMovies] = React.useState(MOVIES_ON_START);

  const handleMovieChange = async (id, diff) => {
    const changedMovie = movies.find(movie => movie.id === id);
    const newMovie = Movie.cloneMovie(changedMovie);
    const updatedMovie = await api.updateMovie(
      id,
      Object.assign(newMovie, diff),
    );
    movieModel.updateMovie(id, updatedMovie);
    setMovies(movieModel.getMovies());
  };

  React.useEffect(() => {
    api
      .getMovies()
      .then(movies => {
        movieModel.setMovies(movies);
        setMovies(movieModel.getMovies());
        setLoadingState(LoadState.LOADED);
      })
      .catch(() => setLoadingState(LoadState.ERROR));
  }, []);

  const loadComments = async movieId => {
    const comments = await api.getComments(movieId);
    setComments(comments);
  };

  const handleCommentDelete = async (movieId, commentId) => {
    await api.deleteComment(commentId);
    await loadComments(movieId);
    await handleMovieChange(movieId, comments);
  };

  const addComment = async (movieId, comment) => {
    await api.createComment(movieId, comment);
    await loadComments(movieId);
    await handleMovieChange(movieId, comments);
  };

  return (
    <div>
      <Header userWatchedMoviesNumber={movieModel.getMoviesNumber()} />
      <main>
        <Menu
          filteredMoviesQuantity={movieModel.getFilter()}
          onMenuItemClick={mode => {
            movieModel.setFilter(
              mode === ViewMode.STATS ? FilterName.ALL : mode.toLowerCase(),
            );
            setWatchMoreMovies(MOVIES_ON_START);
            setMovies(movieModel.getMovies());
            setMode(mode);
            setSortingMode(SortType.DEFAULT);
          }}
          menuItem={viewMode}
        />
        {viewMode !== ViewMode.STATS && (
          <Sorting
            onSortingItemClick={mode => {
              movieModel.setSorting(mode.toLowerCase());
              setMovies(movieModel.getMovies());
              setSortingMode(mode);
            }}
            sortingItem={sortingMode}
          />
        )}
        {viewMode === ViewMode.STATS && (
          <Statistics
            movies={movies}
            userWatchedMoviesNumber={movieModel.getMoviesNumber()}
          />
        )}
        {viewMode !== ViewMode.STATS && movies.length > 0 && (
          <section className={styles.movies}>
            <MoviesList
              onMovieClick={id => {
                setPopupMode(true);
                setOpenedMovie(id);
                loadComments(id);
              }}
              movies={movies.slice(0, moviesOnStart)}
              moviesQuantity={movies.length}
              onShowMoreButtonClick={() => {
                setWatchMoreMovies(moviesOnStart + 5);
              }}
              onMovieChange={handleMovieChange}
            />
            <ExtraContainer
              movies={movieModel.getTopRatedMovies()}
              title="Top rated"
              onMovieClick={id => {
                setPopupMode(true);
                setOpenedMovie(id);
              }}
              onMovieChange={handleMovieChange}
            />
            <ExtraContainer
              movies={movieModel.getMostCommentedMovies()}
              title="Most commented"
              onMovieClick={id => {
                setPopupMode(true);
                setOpenedMovie(id);
              }}
              onMovieChange={handleMovieChange}
            />
          </section>
        )}

        {!movies.length && loadMode === LoadState.LOADED && (
          <NoMovies isLoaded={true} />
        )}
        {loadMode === LoadState.LOADING && <NoMovies />}
      </main>
      <Footer />
      {movies.length > 0 && isPopupOpened && (
        <Popup
          movie={movies.find(({id}) => id === openedMovie)}
          onPopupClose={() => setPopupMode(false)}
          onMovieChange={handleMovieChange}
          comments={comments}
          onDeleteCommentClick={handleCommentDelete}
          onAddComment={addComment}
        />
      )}
    </div>
  );
}

export default App;
