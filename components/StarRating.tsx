import React from 'react';
import { StarIcon as EmptyStarIcon, FilledStarIcon } from './icons';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, className = "h-5 w-5" }) => {
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<FilledStarIcon key={i} className={`${className} text-yellow-400`} />);
    } else {
      // Logic for half stars can be added here if needed
      stars.push(<EmptyStarIcon key={i} className={`${className} text-gray-300`} />);
    }
  }

  return <div className="flex">{stars}</div>;
};

export default StarRating;
