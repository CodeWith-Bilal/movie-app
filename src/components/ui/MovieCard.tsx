import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar } from 'lucide-react';
import { getImageUrl } from '@/lib/api/tmdb';

interface MovieCardProps {
  movie: {
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
  };
  className?: string;
}

export default function MovieCard({ movie, className = '' }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path);
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Link href={`/movies/${movie.id}`} className={`group ${className}`}>
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 border border-slate-700/50 hover:border-blue-500/50">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
            <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors text-lg">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{releaseYear}</span>
            </div>
            <div className="flex items-center text-yellow-400">
              <Star className="w-4 h-4 mr-1 fill-current" />
              <span className="text-slate-300">{rating}</span>
            </div>
          </div>
          
          {movie.overview && (
            <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
