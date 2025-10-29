import React, { useState } from 'react';
import { FilledStarIcon } from './icons';

interface RatingModalProps {
  opportunityTitle: string;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ opportunityTitle, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        onSubmit(rating, comment);
        // onClose will be called from the parent component after submission
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">تقييم فرصة تطوع</h2>
          <p className="text-gray-600">{opportunityTitle}</p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="font-semibold text-gray-700 mb-2 block text-center">ما هو تقييمك العام للتجربة؟</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transform transition-transform duration-150 hover:scale-125"
                >
                  <FilledStarIcon
                    className={`h-10 w-10 cursor-pointer ${
                      (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="font-semibold text-gray-700 mb-2 block">
              شاركنا رأيك (اختياري)
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="صف تجربتك، ما الذي أعجبك؟ وما الذي يمكن تحسينه؟"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-taww-primary focus:border-taww-primary transition duration-200"
            />
          </div>
        </div>

        <div className="p-5 bg-gray-50 border-t flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 btn-press"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="flex-1 bg-taww-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-taww-secondary transition-all duration-300 btn-press disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'إرسال التقييم'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
