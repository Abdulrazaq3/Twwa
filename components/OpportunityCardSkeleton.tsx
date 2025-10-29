import React from 'react';

const OpportunityCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <div className="w-full h-48 shimmer-bg"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <div className="h-5 w-20 shimmer-bg rounded-full"></div>
            <div className="h-4 w-24 shimmer-bg rounded"></div>
        </div>
        <div className="h-6 w-3/4 shimmer-bg rounded mb-3"></div>
        <div className="space-y-2 flex-grow mb-4">
            <div className="h-4 shimmer-bg rounded"></div>
            <div className="h-4 w-5/6 shimmer-bg rounded"></div>
        </div>
        <div className="mt-auto border-t pt-4 space-y-3 text-gray-500 text-sm">
            <div className="flex items-center">
                <div className="h-5 w-5 shimmer-bg rounded-full mr-2"></div>
                <div className="h-4 w-1/3 shimmer-bg rounded"></div>
            </div>
            <div className="flex items-center">
                <div className="h-5 w-5 shimmer-bg rounded-full mr-2"></div>
                <div className="h-4 w-1/2 shimmer-bg rounded"></div>
            </div>
        </div>
      </div>
      <div className="px-6 pb-4 bg-gray-50">
        <div className="w-full h-10 shimmer-bg rounded-lg"></div>
      </div>
    </div>
  );
};

export default OpportunityCardSkeleton;