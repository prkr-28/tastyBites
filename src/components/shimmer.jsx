import ShimmerCard from './shimmercard';

const ShimmerUI = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Shimmer */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse h-32 sm:h-40 lg:h-48 mb-6"></div>
      
      {/* Search Bar Shimmer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 animate-pulse">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 h-12 bg-gray-300 rounded-lg"></div>
            <div className="w-full sm:w-24 h-12 bg-gray-300 rounded-lg"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
            <div className="w-32 h-8 bg-gray-300 rounded-lg"></div>
            <div className="w-20 h-8 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerUI;