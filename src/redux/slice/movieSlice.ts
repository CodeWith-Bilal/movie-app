import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Import API functions dynamically to avoid circular dependency
const fetchMoviesFromAPI = async (page: number, filters?: { genre?: string; year?: string; sortBy?: string }) => {
  const { fetchMoviesFromAPI: apiCall } = await import('@/lib/api/tmdb');
  return apiCall(page, filters);
};

const searchMoviesAPI = async (query: string, page: number) => {
  const { searchMoviesAPI: apiCall } = await import('@/lib/api/tmdb');
  return apiCall(query, page);
};

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  searchQuery: string;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalResults: 0,
  searchQuery: '',
};

// Async thunk for fetching popular movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ page, genre, year, sortBy }: { 
    page: number; 
    genre?: string; 
    year?: string; 
    sortBy?: string; 
  }) => {
    const response = await fetchMoviesFromAPI(page, { genre, year, sortBy });
    return response;
  }
);

// Async thunk for searching movies
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await searchMoviesAPI(query, page);
    return { ...response, query };
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalResults = 0;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies cases
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
        state.searchQuery = '';
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      })
      // Search movies cases
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
        state.searchQuery = action.payload.query;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search movies';
      });
  },
});

export const { setCurrentPage, setSearchQuery, clearMovies, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;
