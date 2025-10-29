
import React from 'react';
import { Badge as BadgeType } from '../types';

interface BadgeProps {
  badge: BadgeType;
}

const Badge: React.FC<BadgeProps> = ({ badge }) => {
  return (
    <div className="text-center p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center shadow-sm transition-transform duration-200 hover:scale-110 hover:shadow-md">
      <div className="text-5xl mb-2">{badge.icon}</div>
      <h4 className="font-bold text-taww-primary">{badge.name}</h4>
      <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
    </div>
  );
};

export default Badge;