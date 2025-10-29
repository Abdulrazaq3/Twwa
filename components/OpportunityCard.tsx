
import React, { useState } from 'react';
import { Opportunity, ApplicationStatus } from '../types';
import { LocationMarkerIcon, CalendarIcon, BriefcaseIcon, ClockIcon } from './icons';
import ImagePreviewModal from './ImagePreviewModal';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onViewDetailsClick: (opportunity: Opportunity) => void;
  className?: string;
  style?: React.CSSProperties;
}

const statusColors: { [key in ApplicationStatus]: string } = {
  'مفتوحة': 'bg-green-100 text-green-800 border-green-200',
  'قيد الترشيح': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'مكتملة': 'bg-gray-200 text-gray-700 border-gray-300',
};

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onViewDetailsClick, className, style }) => {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImagePreviewOpen(true);
  };

  const handleCloseImagePreview = () => {
    setIsImagePreviewOpen(false);
  };

  const deadlineDate = new Date(opportunity.applicationDeadline);
  const formattedDeadline = new Intl.DateTimeFormat('ar-SA', { month: 'long', day: 'numeric' }).format(deadlineDate);

  return (
    <>
      <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transform hover:-translate-y-2 hover:scale-105 flex flex-col transition-all duration-300 ease-out border border-transparent hover:border-taww-primary/20 ${className}`} style={{ opacity: 0, ...style }}>
        <div className="relative">
          <img 
            className="w-full h-44 object-cover group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:blur-sm transition-all duration-500 ease-in-out cursor-pointer" 
            src={opportunity.imageUrl} 
            alt={opportunity.title} 
            onClick={handleImageClick}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full border ${statusColors[opportunity.status]}`}>
              {opportunity.status}
          </span>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <p className="text-sm font-bold text-taww-primary mb-1">{opportunity.organization}</p>
          <h3 className="text-lg font-bold text-gray-900 mb-3">{opportunity.title}</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {opportunity.skillTags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs font-bold rounded-full bg-taww-primary/10 text-taww-primary">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex-grow"></div>
          
          <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-y-3 gap-x-2 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
                <BriefcaseIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span title={`${opportunity.workType} / ${opportunity.workStyle}`}>{opportunity.workType}</span>
            </div>
            <div className="flex items-center gap-2">
                <LocationMarkerIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{opportunity.workStyle === 'عن بُعد' ? opportunity.workStyle : (opportunity.city || opportunity.workStyle)}</span>
            </div>
            <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="truncate" title={opportunity.commitment}>{opportunity.commitment}</span>
            </div>
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>ينتهي في {formattedDeadline}</span>
            </div>
          </div>

          <div className="mt-5">
            <button 
              onClick={() => onViewDetailsClick(opportunity)}
              className="w-full bg-taww-primary text-white font-bold py-2.5 px-4 rounded-lg hover:bg-taww-secondary transition-all duration-300 btn-press hover:shadow-lg hover:shadow-taww-primary/40">
              عرض التفاصيل
            </button>
          </div>
        </div>
      </div>
      {isImagePreviewOpen && (
        <ImagePreviewModal
          imageUrl={opportunity.imageUrl}
          altText={opportunity.title}
          onClose={handleCloseImagePreview}
        />
      )}
    </>
  );
};

export default OpportunityCard;
