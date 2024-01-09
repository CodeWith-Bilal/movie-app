import axios from 'axios';

// TMDb API configuration
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWYwZmJhNmY2ZDE3ZjkzYWUzNTlmYzY2ZTU3MDMxOSIsIm5iZiI6MTc1NjExNzA0Ni4xNzgsInN1YiI6IjY4YWMzODM2MjhiYzE4NjFhMGE5YTNjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n1ncupgvu0ebDL42KMedVMbz94HR-NRN6dgTkwE1CGk';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance with Bearer token authentication
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Types for API responses
export interface TMDbMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

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

export interface TMDbMovieDetailsResponse {
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
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
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

export interface TMDbCreditsResponse {
  id: number;
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }>;
}

export interface TMDbVideosResponse {
  id: number;
  results: Array<{
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
    published_at: string;
  }>;
}

export interface TMDbGenresResponse {
  genres: Array<{
    id: number;
    name: string;
  }>;
}

// API functions
export const fetchMoviesFromAPI = async (
  page: number = 1,
  filters?: {
    genre?: string;
    year?: string;
    sortBy?: string;
  }
): Promise<TMDbMoviesResponse> => {
  const params: Record<string, string | number> = {
    page,
    sort_by: filters?.sortBy || 'popularity.desc',
  };

  if (filters?.genre) {
    params.with_genres = filters.genre;
  }

  if (filters?.year) {
    params.primary_release_year = filters.year;
  }

  const response = await tmdbApi.get('/discover/movie', { params });
  return response.data;
};

export const searchMoviesAPI = async (
  query: string,
  page: number = 1
): Promise<TMDbMoviesResponse> => {
  const response = await tmdbApi.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const fetchMovieDetailsAPI = async (
  movieId: number
): Promise<TMDbMovieDetailsResponse> => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCreditsAPI = async (
  movieId: number
): Promise<TMDbCreditsResponse> => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const fetchMovieVideosAPI = async (
  movieId: number
): Promise<TMDbVideosResponse> => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`);
  return response.data;
};

export const fetchGenresAPI = async (): Promise<TMDbGenresResponse> => {
  const response = await tmdbApi.get('/genre/movie/list');
  return response.data;
};

// Helper functions for image URLs
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: string = 'w1280'): string => {
  if (!path) return '/placeholder-backdrop.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getProfileUrl = (path: string | null, size: string = 'w185'): string => {
  if (!path) return '/placeholder-person.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
