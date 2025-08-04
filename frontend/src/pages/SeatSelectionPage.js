import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { startBooking, confirmBooking } from '../services/api';

const generateSeats = (rows, cols) => {
  const seats = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 1; j <= cols; j++) {
      const rowChar = String.fromCharCode(65 + i);
      seats.push({ id: `${rowChar}${j}` });
    }
  }
  return seats;
};

const SeatSelectionPage = ({ show, onBookingComplete }) => {
  const { token } = useContext(AuthContext);
  const allSeats = generateSeats(8, 12);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(show.bookedSeats || []);
  const [pendingBookingId, setPendingBookingId] = useState(null);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
      let timer;
      if (countdown > 0) {
          timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else if (pendingBookingId) {
          setError("Your session has expired. Please refresh and try again.");
          setPendingBookingId(null);
          // In a real app, you might want to refresh show data here
      }
      return () => clearTimeout(timer);
  }, [countdown, pendingBookingId]);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId) || pendingBookingId) return;
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]);
  };

  const getSeatClass = (seatId) => {
    if (bookedSeats.includes(seatId)) return 'bg-slate-600 cursor-not-allowed';
    if (selectedSeats.includes(seatId)) return 'bg-red-500 border-red-400';
    return 'bg-slate-700 border-slate-600 hover:bg-slate-500';
  };

  const handleInitiateBooking = async () => {
    if (selectedSeats.length === 0) return;
    setError('');
    try {
      const { bookingId, expiresAt } = await startBooking(show.show_id, selectedSeats, token);
      setPendingBookingId(bookingId);
      setBookedSeats(prev => [...prev, ...selectedSeats]);
      const expiryTime = new Date(expiresAt).getTime();
      const now = Date.now();
      setCountdown(Math.floor((expiryTime - now) / 1000));
    } catch (err) {
      setError(err.message);
      setSelectedSeats([]);
    }
  };
  
  const handleConfirm = async () => {
      try {
          const { bookingDetails } = await confirmBooking(pendingBookingId, token);
          onBookingComplete(bookingDetails);
      } catch (err) {
          setError(err.message);
      }
  };

  const totalPrice = selectedSeats.length * show.base_price;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">{show.Movie.title}</h1>
            <p className="text-slate-400">{show.Theater.name} | {new Date(show.show_time).toLocaleString()}</p>
        </div>
        
        {error && <p className="bg-red-500/10 text-red-400 p-3 rounded-md mb-4 border border-red-500/20 text-center">{error}</p>}

        <div className="flex flex-col items-center gap-3">
            <div className="w-full max-w-lg h-1 bg-white/20 rounded-full mb-1"></div>
            <div className="w-full max-w-xl h-4 bg-white rounded-t-full shadow-[0_-10px_20px_-5px_rgba(255,255,255,0.2)] mb-2"></div>
            <p className="text-slate-400 mb-6 uppercase tracking-widest text-sm">Screen This Way</p>

            <div className="flex flex-col items-center gap-2">
                {Array.from({ length: 8 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 items-center">
                    <div className="w-6 text-center text-slate-400">{String.fromCharCode(65 + rowIndex)}</div>
                    {allSeats.filter(s => s.id.startsWith(String.fromCharCode(65 + rowIndex))).map(seat => (
                    <div key={seat.id} onClick={() => handleSeatClick(seat.id)} 
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs cursor-pointer border-b-2 transition-colors ${getSeatClass(seat.id)}`}>
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-700 rounded border-b-2 border-slate-600"></div>Available</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded border-b-2 border-red-400"></div>Selected</div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-600 rounded"></div>Booked</div>
        </div>
      </div>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-md border-t border-slate-700 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
            {pendingBookingId ? (
                <>
                    <p className="text-yellow-400 text-lg font-semibold">Confirm within {Math.floor(countdown / 60)}:{('0' + countdown % 60).slice(-2)}</p>
                    <button onClick={handleConfirm} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-colors">Confirm Booking</button>
                </>
            ) : selectedSeats.length > 0 ? (
                <>
                    <div>
                        <p className="text-white font-bold text-xl">{selectedSeats.length} Ticket(s) selected</p>
                        <p className="text-slate-400 text-sm">{selectedSeats.join(', ')}</p>
                    </div>
                    <button onClick={handleInitiateBooking} className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-700 transition-colors">Pay ₹{totalPrice.toFixed(2)}</button>
                </>
            ) : (
                <p className="text-slate-400 text-lg">Please select your seats</p>
            )}
        </div>
      </footer>
    </div>
  );
};
export default SeatSelectionPage;
