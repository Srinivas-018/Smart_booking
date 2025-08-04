import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchMovies, fetchTheaters, fetchShowsForMovie } from '../services/api';
import MovieManager from '../components/admin/MovieManager';
import TheaterManager from '../components/admin/TheaterManager';
import ShowManager from '../components/admin/ShowManager';
// Import the new BookingsList component
import BookingsList from '../components/admin/BookingsList';
import { Loader } from 'lucide-react';

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('movies');
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        setLoading(true);
        // We only load data for the initial tabs here.
        // BookingsList will fetch its own data when it's rendered.
        const [moviesData, theatersData, showsData] = await Promise.all([
          fetchMovies(),
          fetchTheaters(),
          fetchShowsForMovie('')
        ]);
        setMovies(moviesData);
        setTheaters(theatersData);
        setShows(showsData);
      } catch (error) {
        console.error("Failed to load admin data", error);
      } finally {
        setLoading(false);
      }
    };
    loadAdminData();
  }, []);

  if (user?.role !== 'admin') {
    return <div className="p-8 text-red-500">Access Denied. Admins only.</div>;
  }

  const renderContent = () => {
    // The main page loader only affects the initial tabs
    const initialTabsLoading = loading && (activeTab === 'movies' || activeTab === 'theaters' || activeTab === 'shows');
    if (initialTabsLoading) {
        return <div className="flex justify-center p-8"><Loader className="animate-spin text-red-500" size={32}/></div>;
    }

    switch (activeTab) {
      case 'theaters':
        return <TheaterManager theaters={theaters} onTheatersUpdate={setTheaters} />;
      case 'shows':
        return <ShowManager shows={shows} movies={movies} theaters={theaters} onShowsUpdate={setShows} />;
      // Add the case to render the BookingsList component
      case 'bookings':
        return <BookingsList />;
      case 'movies':
      default:
        return <MovieManager movies={movies} onMoviesUpdate={setMovies} />;
    }
  };

  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-6 py-3 font-bold transition-colors text-lg ${activeTab === tabName ? 'border-b-2 border-red-500 text-white' : 'text-slate-400 hover:text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex border-b border-slate-700">
        <TabButton tabName="movies" label="Manage Movies" />
        <TabButton tabName="theaters" label="Manage Theaters" />
        <TabButton tabName="shows" label="Manage Shows" />
        {/* Add the new tab button here */}
        <TabButton tabName="bookings" label="All Bookings" />
      </div>
      <div className="bg-slate-800 p-6 rounded-b-lg">
        {renderContent()}
      </div>
    </div>
  );
};
export default AdminPage;