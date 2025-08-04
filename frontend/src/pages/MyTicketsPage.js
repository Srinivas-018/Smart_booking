import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchBookingHistory } from '../services/api';
import { Loader } from 'lucide-react';

const MyTicketsPage = () => {
  const { user, token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      const loadHistory = async () => {
        try {
          setLoading(true);
          const history = await fetchBookingHistory(token);
          setBookings(history);
        } catch (err) { setError(err.message); } 
        finally { setLoading(false); }
      };
      loadHistory();
    } else { setLoading(false); }
  }, [token]);

  if (!user) {
    return <div className="p-8 text-center text-slate-400">Please log in to view your tickets.</div>;
  }
  if (loading) {
    return <div className="flex justify-center p-8"><Loader className="animate-spin text-red-500" size={48} /></div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-400">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">My Tickets</h1>
      {bookings.length === 0 ? (
        <div className="bg-slate-800 rounded-lg p-8 text-center text-slate-400 border border-slate-700">You have no confirmed bookings.</div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking.booking_id} className="bg-slate-800 rounded-lg p-6 flex flex-col sm:flex-row gap-6 border border-slate-700 shadow-lg">
              <img src={booking.Show.Movie.poster_url} alt={booking.Show.Movie.title} className="w-32 h-48 rounded-md object-cover self-center sm:self-start" />
              <div className="flex-grow">
                <h2 className="text-2xl font-bold">{booking.Show.Movie.title}</h2>
                <p className="text-slate-300 font-semibold">{booking.Show.Theater.name}, {booking.Show.Theater.city}</p>
                <p className="text-slate-400 text-sm mb-4">{new Date(booking.Show.show_time).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</p>
                <div className="border-t border-slate-700 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                        <p className="text-slate-400 text-sm">SEATS</p>
                        <p className="font-bold text-white text-lg">{booking.BookingSeats.map(bs => bs.seat_identifier).join(', ')}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm text-right">TOTAL</p>
                        <p className="font-bold text-green-400 text-lg">₹{booking.total_amount}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs mt-4">Booking ID: {booking.booking_id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyTicketsPage;
