import React from 'react';
import { Search } from 'lucide-react';
import MovieCard from '../components/MovieCard';

const HomePage = ({ movies, onSelectMovie }) => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      
        <h2 className="text-3xl font-bold text-white mb-4">Welcome to BookYourshow!</h2>
        <div className="relative">
            <input type="text" placeholder="Search for movies, events, plays, sports and activities" className="w-full bg-slate-800 text-white rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-red-500 border border-slate-700" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
        </div>
    </div>

    <div>
        <h3 className="text-2xl font-bold text-white mb-4">Recommended Movies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map(movie => <MovieCard key={movie.movie_id} movie={movie} onSelectMovie={onSelectMovie} />)}
        </div>
    </div>
  </div>
);
export default HomePage;
