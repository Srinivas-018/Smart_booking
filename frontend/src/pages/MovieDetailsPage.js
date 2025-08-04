import React, { useContext } from 'react';
import { Star, Loader, Clock, Tag } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const MovieDetailsPage = ({ movie, shows, isLoading, onSelectShow, onReviewSubmitted }) => {
  const { user } = useContext(AuthContext);

  if (isLoading || !movie) {
    return <div className="flex justify-center items-center h-[60vh]"><Loader className="text-red-500 animate-spin" size={48} /></div>;
  }

  const hasUserReviewed = movie.Reviews.some(review => review.user_id === user?.user_id);

  const showsByTheater = shows.reduce((acc, show) => {
    const theater = show.Theater;
    if (!acc[theater.theater_id]) {
      acc[theater.theater_id] = { ...theater, shows: [] };
    }
    acc[theater.theater_id].shows.push(show);
    return acc;
  }, {});

  return (
    <>
      <div className="relative h-64 md:h-96">
        <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover object-top opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <img src={movie.poster_url} alt={movie.title} className="w-64 mx-auto md:mx-0 rounded-lg shadow-2xl" />
          <div className="text-white pt-8">
            <h1 className="text-5xl font-bold">{movie.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-slate-300">
                <div className="flex items-center gap-2">
                    <Star className="text-yellow-400" fill="currentColor" size={20} />
                    <span className="text-lg font-bold text-white">{movie.rating} / 5</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{movie.duration_minutes} mins</span>
                </div>
                <div className="flex items-center gap-2">
                    <Tag size={20} />
                    <span>{movie.genre}</span>
                </div>
            </div>
            <p className="mt-6 text-slate-300 max-w-2xl">{movie.synopsis}</p>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6">Showtimes</h2>
          {Object.values(showsByTheater).length > 0 ? (
            Object.values(showsByTheater).map(theater => (
              <div key={theater.theater_id} className="bg-slate-800 rounded-lg p-6 mb-4 border border-slate-700">
                <h3 className="text-2xl font-bold text-white">{theater.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{theater.address}</p>
                <div className="flex flex-wrap gap-3">
                  {theater.shows.map(show => (
                    <button key={show.show_id} onClick={() => onSelectShow(show)} className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 border border-slate-600 hover:border-red-600 transition-all duration-200">
                      {new Date(show.show_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-800 rounded-lg p-6 text-center text-slate-400">No shows available for this movie today.</div>
          )}
        </div>

        <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-6">Ratings & Reviews</h2>
            {user && !hasUserReviewed && (
                <ReviewForm movieId={movie.movie_id} onReviewSubmitted={onReviewSubmitted} />
            )}
            {user && hasUserReviewed && (
                <div className="bg-slate-800 p-4 rounded-lg text-slate-400 border border-slate-700">You've already reviewed this movie. Thank you!</div>
            )}
            <ReviewList reviews={movie.Reviews} />
        </div>
      </div>
    </>
  );
};
export default MovieDetailsPage;
