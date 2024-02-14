'use client';

import { useEffect } from 'react';
import MoviesGrid from '@/components/movies/MoviesGrid';
import FiltersBar from '@/components/movies/FiltersBar';
import Pagination from '@/components/ui/Pagination';
import Loader from '@/components/ui/Loader';
import ErrorComponent from '@/components/ui/ErrorComponent';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMovies, searchMovies, setCurrentPage } from '@/redux/slice/movieSlice';

export default function MoviesPage() {
  const dispatch = useAppDispatch();
  const { 
    movies, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    totalResults,
    searchQuery 
  } = useAppSelector((state: any) => state.movies);
  const { genre, year, sortBy } = useAppSelector((state: any) => state.filters);

  // Initial load
  useEffect(() => {
    if (movies.length === 0 && !loading && !error) {
      dispatch(fetchMovies({ page: 1 }));
    }
  }, [dispatch, movies.length, loading, error]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (searchQuery) {
      // If searching, use search endpoint
      dispatch(searchMovies({ query: searchQuery, page }));
    } else {
      // Otherwise use discover/filter endpoint
      dispatch(fetchMovies({ 
        page, 
        genre: genre || undefined, 
        year: year || undefined, 
        sortBy 
      }));
    }
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: currentPage }));
    } else {
      dispatch(fetchMovies({ 
        page: currentPage, 
        genre: genre || undefined, 
        year: year || undefined, 
        sortBy 
      }));
    }
  };

  const getResultsText = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}" (${totalResults.toLocaleString()} movies found)`;
    }
    return `Showing ${totalResults.toLocaleString()} movies`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {searchQuery ? 'Search Results' : 'Discover Movies'}
        </h1>
        <p className="text-slate-400 text-lg">
          {searchQuery ? getResultsText() : 'Explore our vast collection of movies'}
        </p>
      </div>

      <FiltersBar />

      {error && (
        <ErrorComponent
          message={error}
          onRetry={handleRetry}
          className="mb-6"
        />
      )}

      {loading && (
        <div className="py-12">
          <Loader size="lg" className="mb-4" />
          <p className="text-center text-slate-400">Loading movies...</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Results summary */}
          {totalResults > 0 && (
            <div className="mb-6 text-sm text-slate-400 bg-slate-800/50 rounded-lg px-4 py-2 backdrop-blur-sm">
              {getResultsText()} • Page {currentPage} of {totalPages}
            </div>
          )}

          <MoviesGrid movies={movies} className="mb-8" />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.min(totalPages, 500)} // TMDb API limit
              onPageChange={handlePageChange}
              className="mt-8"
            />
          )}
        </>
      )}
    </div>
  );
}
