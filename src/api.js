import Movie from './models/movie';
import Comments from './models/comments';

const MIN_OK_RESPONSE_STATUS = 200;
const MAX_OK_RESPONSE_STATUS = 299;

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

const checkStatus = response => {
  if (
    response.status >= MIN_OK_RESPONSE_STATUS &&
    response.status < MAX_OK_RESPONSE_STATUS
  ) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(url, authorization) {
    this._url = url;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({ url: `/movies` })
      .then(response => response.json())
      .then(Movie.parseMovies);
  }

  getComments(movieId) {
    return this._load({ url: `/comments/${movieId}` })
      .then(response => response.json())
      .then(Comments.parseComments);
  }

  createComment(movieId, comment) {
    return this._load({
      url: `/comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': `application/json` }),
    })
      .then(response => response.json())
      .then(newData => ({
        movie: Movie.parseMovie(newData.movie),
        comments: Comments.parseComments(newData.comments),
      }));
  }

  deleteComment(id) {
    return this._load({ url: `/comments/${id}`, method: Method.DELETE });
  }

  updateMovie(id, movie) {
    return this._load({
      url: `/movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(movie.toJSONFormat()),
      headers: new Headers({ 'Content-Type': `application/json` }),
    })
      .then(response => response.json())
      .then(Movie.parseMovie);
  }

  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._url}/${url}`, { method, body, headers })
      .then(checkStatus)
      .catch(error => {
        throw error;
      });
  }
}
