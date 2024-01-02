import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/moviesSlice';
import movieDetailReducer from './features/movieDetailSlice';
import filtersReducer from './features/filtersSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetail: movieDetailReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
