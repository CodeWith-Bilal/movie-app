'use client';

import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
// import { setGenre, setYear, setSortBy, clearFilters } from '@/lib/redux/features/filtersSlice';
import FilterDropdown from '@/components/ui/FilterDropdown';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearFilters, setGenre, setSortBy, setYear } from '@/redux/slice/filterSlice';
import SearchBar from '../ui/Searchbar';
import { fetchMovies, searchMovies, setSearchQuery } from '@/redux/slice/movieSlice';

interface FiltersBarProps {
  onFiltersChange?: () => void;
}

// Sample data - in a real app, you'd fetch this from the API
const genreOptions = [
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
  { value: '27', label: 'Horror' },
  { value: '10402', label: 'Music' },
  { value: '9648', label: 'Mystery' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science Fiction' },
  { value: '10770', label: 'TV Movie' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
];

const yearOptions = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

const sortOptions = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'vote_average.asc', label: 'Lowest Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'release_date.asc', label: 'Oldest First' },
  { value: 'title.asc', label: 'A-Z' },
  { value: 'title.desc', label: 'Z-A' },
];

export default function FiltersBar({ onFiltersChange }: FiltersBarProps) {
  const dispatch = useAppDispatch();
  const { genre, year, sortBy } = useAppSelector((state: any) => state.filters);
  const { searchQuery } = useAppSelector((state: any) => state.movies);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Check if any filters are active
  useEffect(() => {
    setHasActiveFilters(!!(genre || year || sortBy !== 'popularity.desc' || searchQuery));
  }, [genre, year, sortBy, searchQuery]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    if (query.trim()) {
      dispatch(searchMovies({ query: query.trim(), page: 1 }));
    } else {
      dispatch(fetchMovies({ 
        page: 1, 
        genre: genre || undefined, 
        year: year || undefined, 
        sortBy 
      }));
    }
    onFiltersChange?.();
  };

  const handleGenreChange = (value: string) => {
    dispatch(setGenre(value));
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: 1 }));
    } else {
      dispatch(fetchMovies({ 
        page: 1, 
        genre: value || undefined, 
        year: year || undefined, 
        sortBy 
      }));
    }
    onFiltersChange?.();
  };

  const handleYearChange = (value: string) => {
    dispatch(setYear(value));
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: 1 }));
    } else {
      dispatch(fetchMovies({ 
        page: 1, 
        genre: genre || undefined, 
        year: value || undefined, 
        sortBy 
      }));
    }
    onFiltersChange?.();
  };

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value));
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: 1 }));
    } else {
      dispatch(fetchMovies({ 
        page: 1, 
        genre: genre || undefined, 
        year: year || undefined, 
        sortBy: value 
      }));
    }
    onFiltersChange?.();
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(setSearchQuery(''));
    dispatch(fetchMovies({ page: 1 }));
    onFiltersChange?.();
  };

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6 shadow-xl">
      <div className="space-y-4">
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={(value) => dispatch(setSearchQuery(value))}
          onSearch={handleSearch}
          placeholder="Search movies by title..."
          className="w-full"
        />

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <FilterDropdown
            value={genre}
            onChange={handleGenreChange}
            options={genreOptions}
            placeholder="All Genres"
            label="Genre"
          />
          
          <FilterDropdown
            value={year}
            onChange={handleYearChange}
            options={yearOptions}
            placeholder="All Years"
            label="Year"
          />
          
          <FilterDropdown
            value={sortBy}
            onChange={handleSortChange}
            options={sortOptions}
            placeholder="Sort By"
            label="Sort By"
          />

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="flex items-center px-4 py-2 text-sm text-slate-300 hover:text-red-400 border border-slate-600 hover:border-red-500 rounded-lg transition-all duration-200 bg-slate-700/50 hover:bg-red-500/10"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
