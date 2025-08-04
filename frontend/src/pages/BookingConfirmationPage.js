import React from 'react';

const BookingConfirmationPage = ({ bookingDetails, onDone }) => {
  if (!bookingDetails) return null;
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-slate-800 rounded-lg p-8 max-w-lg mx-auto mt-10 shadow-2xl text-center border border-slate-700">
        <h1 className="text-3xl font-bold text-green-400 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-300 mb-8">Your e-ticket has been sent to your email.</p>
        <div className="bg-white text-black p-6 rounded-lg">
          <h2 className="text-2xl font-bold">{bookingDetails.movie_title || bookingDetails.Show?.Movie?.title}</h2>
          <p className="text-slate-600">{bookingDetails.theater_name || bookingDetails.Show?.Theater?.name}</p>
          <p className="text-slate-600 font-medium">{new Date(bookingDetails.show_time).toLocaleString()}</p>
          <div className="my-4 border-t-2 border-dashed border-slate-300"></div>
          <div className="text-left">
            <p className="text-slate-500 text-sm uppercase tracking-wider">Seats</p>
            <p className="font-bold text-2xl">{bookingDetails.seats ? bookingDetails.seats.join(', ') : bookingDetails.BookingSeats?.map(s => s.seat_identifier).join(', ')}</p>
          </div>
          <div className="my-4 border-t-2 border-dashed border-slate-300"></div>
          <svg className="w-36 h-36 mx-auto" viewBox="0 0 256 256"><path fill="black" d="M140 140h40v40h-40zM76 76h40v40H76zm64 0h40v40h-40zM76 140h40v40H76zm112-56a8 8 0 00-8-8h-24a8 8 0 00-8 8v24a8 8 0 008 8h24a8 8 0 008-8zM92 68a8 8 0 00-8-8H60a8 8 0 00-8 8v24a8 8 0 008 8h24a8 8 0 008-8zm8 80a8 8 0 00-8-8H60a8 8 0 00-8 8v24a8 8 0 008 8h24a8 8 0 008-8zm48-48h40v40h-40zm48 48h24a8 8 0 008-8v-24a8 8 0 00-8-8h-24a8 8 0 00-8 8v24a8 8 0 008 8zM40 52a12 12 0 0112-12h32a12 12 0 0112 12v32a12 12 0 01-12 12H52a12 12 0 01-12-12zm144-12a12 12 0 0112 12v32a12 12 0 01-12 12h-32a12 12 0 01-12-12V52a12 12 0 0112-12zm-12 144a12 12 0 00-12-12h-32a12 12 0 00-12 12v32a12 12 0 0012 12h32a12 12 0 0012-12zM52 160a12 12 0 00-12 12v32a12 12 0 0012 12h32a12 12 0 0012-12v-32a12 12 0 00-12-12z"/></svg>
          <p className="text-xs text-slate-500 mt-2">Booking ID: {bookingDetails.booking_id}</p>
        </div>
        <button onClick={onDone} className="mt-8 w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors text-lg">Done</button>
      </div>
    </div>
  );
};
export default BookingConfirmationPage;
