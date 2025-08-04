import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { adminGetAllBookings } from '../../services/api';

const BookingsList = () => {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) {
        setError("Admin not authenticated.");
        setLoading(false);
        return;
      }
      try {
        const data = await adminGetAllBookings(token);
        setBookings(data);
      } catch (err) {
        setError('Failed to fetch bookings. ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  if (loading) {
    return <p className="text-center text-slate-400">Loading all bookings...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">All Confirmed Bookings</h1>
      <div className="space-y-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.booking_id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{booking.Show.Movie.title}</h2>
                  <p className="text-slate-400">{booking.Show.Theater.name}, {booking.Show.Theater.city}</p>
                </div>
                <div className="text-left md:text-right mt-4 md:mt-0">
                  <p className="text-slate-300 font-semibold">Booked by: <span className="text-white">{booking.User.name}</span></p>
                  <p className="text-slate-400">{booking.User.email}</p>
                </div>
              </div>
              <div className="border-t border-slate-700 pt-4 mt-4">
                 <p className="text-slate-300">
                    <span className="font-semibold">Seats:</span> {booking.BookingSeats.map(s => s.seat_identifier).join(', ')}
                 </p>
                 <p className="text-slate-300">
                    <span className="font-semibold">Booked on:</span> {new Date(booking.createdAt).toLocaleString()}
                 </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-400">No confirmed bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsList;