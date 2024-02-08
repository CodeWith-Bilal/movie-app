'use client';

import { Movie } from '@/redux/slice/movieSlice';
import MovieCard from '@/components/ui/MovieCard';

interface MoviesGridProps {
  movies: Movie[];
  className?: string;
}

export default function MoviesGrid({ movies, className = '' }: MoviesGridProps) {
  if (movies.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 max-w-md mx-auto">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold mb-2 text-slate-200">No movies found</h3>
          <p className="text-slate-400">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${className}`}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
