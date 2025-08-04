import React from 'react';
import { Star } from 'lucide-react';

const MovieCard = ({ movie, onSelectMovie }) => {
  // Construct the correct, full URL for the image by pointing to your backend server.
  // This uses the environment variable we discussed (e.g., http://localhost:3001).
  const imageUrl = movie.poster_url
    ? `${process.env.REACT_APP_BACKEND_URL}${movie.poster_url}`
    : `https://via.placeholder.com/400x600.png/0F172A/FF0000?text=${encodeURIComponent(movie.title)}`;

  return (
    <div onClick={() => onSelectMovie(movie)} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg cursor-pointer group transform hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-96 object-cover"
          // This onError handler provides a fallback in case an image is still missing
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loops
            e.target.src = `https://via.placeholder.com/400x600.png/0F172A/FF0000?text=Not+Found`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white drop-shadow-lg">{movie.title}</h3>
          <div className="flex items-center gap-1 mt-1">
              <Star className="text-yellow-400" fill="currentColor" size={16}/>
              <span className="text-white font-semibold text-sm">{movie.rating} / 5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;