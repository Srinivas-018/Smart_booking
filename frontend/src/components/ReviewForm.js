import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { createReview } from '../services/api';
import { Star } from 'lucide-react';

const ReviewForm = ({ movieId, onReviewSubmitted }) => {
  const { token } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    setError('');
    try {
      const newReview = await createReview(movieId, { rating, comment }, token);
      onReviewSubmitted(newReview);
      setRating(0);
      setComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg mb-6 border border-slate-700">
      <h4 className="font-bold text-xl mb-4 text-white">Write a Review</h4>
      {error && <p className="text-red-400 mb-2">{error}</p>}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={starValue}
              size={28}
              className={`cursor-pointer transition-colors ${starValue <= (hoverRating || rating) ? 'text-yellow-400' : 'text-slate-600'}`}
              fill="currentColor"
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(0)}
            />
          );
        })}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts on the movie..."
        className="w-full bg-slate-700 text-white p-3 rounded-md h-28 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button type="submit" className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">Submit Review</button>
    </form>
  );
};
export default ReviewForm;
