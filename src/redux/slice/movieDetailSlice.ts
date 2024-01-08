import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import API functions dynamically to avoid circular dependency
const fetchMovieDetailsAPI = async (movieId: number) => {
  const { fetchMovieDetailsAPI: apiCall } = await import('@/lib/api/tmdb');
  return apiCall(movieId);
};

const fetchMovieCreditsAPI = async (movieId: number) => {
  const { fetchMovieCreditsAPI: apiCall } = await import('@/lib/api/tmdb');
  return apiCall(movieId);
};

const fetchMovieVideosAPI = async (movieId: number) => {
  const { fetchMovieVideosAPI: apiCall } = await import('@/lib/api/tmdb');
  return apiCall(movieId);
};

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  budget: number;
  revenue: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  homepage: string | null;
  imdb_id: string | null;
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
}

export interface MovieDetailState {
  movieDetail: MovieDetail | null;
  cast: CastMember[];
  crew: CrewMember[];
  videos: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailState = {
  movieDetail: null,
  cast: [],
  crew: [],
  videos: [],
  loading: false,
  error: null,
};

// Async thunk for fetching movie details
export const fetchMovieDetail = createAsyncThunk(
  'movieDetail/fetchMovieDetail',
  async (movieId: number) => {
    const [details, credits, videos] = await Promise.all([
      fetchMovieDetailsAPI(movieId),
      fetchMovieCreditsAPI(movieId),
      fetchMovieVideosAPI(movieId),
    ]);
    
    return {
      details,
      cast: credits.cast,
      crew: credits.crew,
      videos: videos.results,
    };
  }
);

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    clearMovieDetail: (state) => {
      state.movieDetail = null;
      state.cast = [];
      state.crew = [];
      state.videos = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload.details;
        state.cast = action.payload.cast;
        state.crew = action.payload.crew;
        state.videos = action.payload.videos;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details';
      });
  },
});

export const { clearMovieDetail, clearError } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;
