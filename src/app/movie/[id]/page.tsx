'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl, getBackdropUrl, getProfileUrl } from '@/lib/api/tmdb';
import Loader from '@/components/ui/Loader';
import ErrorComponent from '@/components/ui/ErrorComponent';
import { ArrowLeft, Star, Calendar, Clock, Play, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearMovieDetail, fetchMovieDetail } from '@/redux/slice/movieDetailSlice';
import { RootState } from '@/redux/store';

// Define the Genre type if not already defined elsewhere
type Genre = {
  id: number;
  name: string;
};

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { movieDetail, cast, videos, loading, error } = useAppSelector((state: RootState) => state.movieDetail);

  const movieId = parseInt(params.id as string);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetail(movieId));
    }

    return () => {
      dispatch(clearMovieDetail());
    };
  }, [dispatch, movieId]);

  const handleRetry = () => {
    if (movieId) {
      dispatch(fetchMovieDetail(movieId));
    }
  };

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTrailerVideo = () => {
    interface Video {
        id: string;
        key: string;
        name: string;
        site: string;
        type: string;
        official: boolean;
    }

    return videos.find((video: Video) => 
        video.type === 'Trailer' && 
        video.site === 'YouTube' && 
        video.official
    ) || videos.find((video: Video) => 
        video.type === 'Trailer' && 
        video.site === 'YouTube'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader size="lg" />
          <p className="mt-4 text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorComponent
            message={error}
            onRetry={handleRetry}
          />
          <Link
            href="/movies"
            className="mt-4 flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  if (!movieDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Movie not found</h2>
          <p className="text-gray-600 mb-4">The movie you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/movies"
            className="flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movieDetail.backdrop_path);
  const posterUrl = getImageUrl(movieDetail.poster_path, 'w500');
  const releaseYear = movieDetail.release_date ? new Date(movieDetail.release_date).getFullYear() : 'N/A';
  const rating = movieDetail.vote_average ? movieDetail.vote_average.toFixed(1) : 'N/A';
  const trailer = getTrailerVideo();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={backdropUrl}
          alt={movieDetail.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center px-4 py-2 bg-black/70 text-white rounded-lg hover:bg-black/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>

        {/* Play Trailer Button */}
        {trailer && (
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Trailer
            </a>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <div className="w-64 mx-auto md:mx-0">
              <Image
                src={posterUrl}
                alt={movieDetail.title}
                width={256}
                height={384}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {movieDetail.title}
            </h1>
            
            {movieDetail.tagline && (
              <p className="text-lg text-gray-600 italic mb-4">
                &ldquo;{movieDetail.tagline}&rdquo;
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{releaseYear}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{formatRuntime(movieDetail.runtime)}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{rating}/10</span>
                <span className="ml-1 text-gray-400">
                  ({movieDetail.vote_count.toLocaleString()} votes)
                </span>
              </div>
            </div>

            {/* Genres */}
            {movieDetail.genres.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {movieDetail.genres.map((genre: Genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {movieDetail.overview || 'No overview available.'}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movieDetail.budget > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Budget</h3>
                  <p className="text-gray-700">{formatCurrency(movieDetail.budget)}</p>
                </div>
              )}
              
              {movieDetail.revenue > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Revenue</h3>
                  <p className="text-gray-700">{formatCurrency(movieDetail.revenue)}</p>
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Status</h3>
                <p className="text-gray-700">{movieDetail.status}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Original Language</h3>
                <p className="text-gray-700">{movieDetail.original_language.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cast.slice(0, 12).map((actor: { id: number; name: string; character: string; profile_path: string | null }) => (
                <div key={actor.id} className="text-center">
                  <div className="relative w-full aspect-[2/3] mb-2 overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={getProfileUrl(actor.profile_path)}
                      alt={actor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 truncate">
                    {actor.name}
                  </h3>
                  <p className="text-xs text-gray-600 truncate">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
