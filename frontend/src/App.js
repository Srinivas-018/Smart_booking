import React, { useState, useEffect, useContext } from 'react';
import { Loader } from 'lucide-react';
import { AuthContext } from './contexts/AuthContext';
import { fetchMovies, fetchMovieById, fetchShowsForMovie } from './services/api';

import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import AdminPage from './pages/AdminPage';
import MyTicketsPage from './pages/MyTicketsPage';
import Navbar from './components/Navbar';

export default function App() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState('home');
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (err) {
        setError('Could not connect to the server. Please make sure it is running.');
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleSelectMovie = async (movie) => {
    setPage('details');
    try {
      setIsLoading(true);
      setError(null);
      const [movieDetails, showsData] = await Promise.all([
        fetchMovieById(movie.movie_id),
        fetchShowsForMovie(movie.movie_id)
      ]);
      setSelectedMovie(movieDetails);
      setShows(showsData);
    } catch (err) {
      setError('Could not fetch movie details.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReviewSubmitted = (newReview) => {
    setSelectedMovie(prevMovie => ({
        ...prevMovie,
        Reviews: [...prevMovie.Reviews, newReview]
    }));
  };

  const handleSelectShow = (show) => {
    if (!user) {
      alert("Please log in to book tickets.");
      return;
    }
    setSelectedShow(show);
    setPage('seats');
  };

  const handleBookingComplete = (details) => {
    setBookingDetails(details);
    setPage('confirmation');
  };

  const navigateTo = (targetPage) => {
    setPage(targetPage);
    setSelectedMovie(null);
    setSelectedShow(null);
  }

  const renderPage = () => {
    if (page === 'home' && isLoading) {
      return <div className="flex justify-center items-center h-screen"><Loader className="text-red-500 animate-spin" size={48} /></div>;
    }
    if (error) {
      return <div className="text-center text-red-400 p-8 bg-red-900/50 border border-red-800 rounded-lg m-4">{error}</div>;
    }

    switch (page) {
      case 'admin':
        return <AdminPage />;
      case 'tickets':
        return <MyTicketsPage />;
      case 'details':
        return <MovieDetailsPage movie={selectedMovie} shows={shows} isLoading={isLoading} onSelectShow={handleSelectShow} onReviewSubmitted={handleReviewSubmitted} />;
      case 'seats':
        return <SeatSelectionPage show={selectedShow} onBookingComplete={handleBookingComplete} />;
      case 'confirmation':
        return <BookingConfirmationPage bookingDetails={bookingDetails} onDone={() => navigateTo('home')} />;
      case 'home':
      default:
        return <HomePage movies={movies} onSelectMovie={handleSelectMovie} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen font-sans text-white">
      <Navbar onNavigate={navigateTo} />
      <main className="pt-20">
        {renderPage()}
      </main>
    </div>
  );
}
