import React from 'react';

const ShimmerList = ({ count = 8 }) => {
  const shimmerItems = Array.from({ length: count }, (_, index) => index);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Restaurant Header Shimmer */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 sm:mb-8 animate-pulse">
          <div className="h-48 sm:h-56 lg:h-64 bg-gray-300"></div>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="h-6 sm:h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section Shimmer */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-pulse">
          <div className="text-center mb-6 sm:mb-8">
            <div className="h-6 sm:h-8 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>
            <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {shimmerItems.map((index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Category Header */}
                <div className="bg-gray-100 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                </div>
                
                {/* Menu Items */}
                <div className="bg-gray-50 p-4 sm:p-6 space-y-4">
                  {Array.from({ length: 3 }).map((_, itemIndex) => (
                    <div key={itemIndex} className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-300 rounded w-full"></div>
                          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                        </div>
                        <div className="h-10 bg-gray-300 rounded w-32"></div>
                      </div>
                      <div className="flex-shrink-0 lg:w-32 xl:w-40">
                        <div className="w-full h-24 sm:h-28 lg:h-32 bg-gray-300 rounded-lg"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerList;