import React from 'react';
import { Star } from 'lucide-react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-slate-400 mt-4">No reviews yet. Be the first to write one!</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      {reviews.map(review => (
        <div key={review.review_id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-white">{review.User.name}</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400' : 'text-slate-600'} fill="currentColor" />
              ))}
            </div>
          </div>
          <p className="text-slate-300">{review.comment}</p>
          <p className="text-xs text-slate-500 mt-2 text-right">{new Date(review.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};
export default ReviewList;
