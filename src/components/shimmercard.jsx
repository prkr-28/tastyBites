const ShimmerCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md animate-pulse overflow-hidden h-full">
      {/* Image placeholder */}
      <div className="h-40 sm:h-44 lg:h-48 bg-gray-300"></div>
      
      {/* Content placeholder */}
      <div className="p-3 sm:p-4 space-y-3">
        {/* Title */}
        <div className="h-4 sm:h-5 bg-gray-300 rounded w-3/4"></div>
        
        {/* Cuisines */}
        <div className="space-y-2">
          <div className="h-3 sm:h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-3 sm:h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
        
        {/* Price and rating */}
        <div className="flex justify-between items-center">
          <div className="h-3 sm:h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-3 sm:h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
        
        {/* Delivery time */}
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;