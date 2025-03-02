import React from 'react';

export const ProductItemSkeleton = () => {

    return (
      <div className="product-card relative overflow-hidden shadow-lg rounded-lg transition-all duration-300">
        <div className="image-container h-48 bg-gray-300 animate-shimmer" />
        
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4 animate-shimmer" />
          <div className="flex justify-between items-center mt-2">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-shimmer" />
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-shimmer" />
          </div>
          <div className="mt-4 flex items-center">
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-shimmer" />
          </div>
        </div>
      </div>
    );
  };
