import moment from 'moment';

export const ViewMode = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Statistics`,
};

export const LoadState = {
  LOADING: `Loading`,
  LOADED: `Loaded`,
  ERROR: `Error`,
};

export const Period = {
  ALL_TIME: moment(new Date(0)),
  TODAY: moment().subtract(1, `days`),
  WEEK: moment().subtract(1, `weeks`),
  MONTH: moment().subtract(1, `months`),
  YEAR: moment().subtract(1, `years`),
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const FilterName = {
  ALL: `all movies`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const controlButtons = [`isWatchlist`, `isHistory`, `isFavorites`];

export const ControlButton = {
  isWatchlist: `watchlist`,
  isHistory: `history`,
  isFavorites: `favorite`,
};

export const ButtonAction = {
  isWatchlist: `Add to watchlist`,
  isHistory: `Mark as watched`,
  isFavorites: `Mark as favorite`,
};

export const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];
