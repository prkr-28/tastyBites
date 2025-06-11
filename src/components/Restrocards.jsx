const Restrocards = ({ resData }) => {
  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    totalRatingsString,
    sla,
    cloudinaryImageId,
  } = resData.info;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
      <div className="relative">
        <img
          className="w-full h-40 sm:h-44 lg:h-48 object-cover"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
          alt={name}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium">
          {sla.deliveryTime} min
        </div>
      </div>
      
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {name}
        </h3>
        
        <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-2 flex-1">
          {cuisines.join(', ')}
        </p>
        
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{costForTwo}</span>
            <div className="flex items-center space-x-1">
              <span className="text-xs sm:text-sm font-medium text-green-600">
                {avgRating} ⭐
              </span>
              <span className="text-xs text-gray-400">
                ({totalRatingsString})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Higher order component for veg label
export const withveglabel = (Restrocards) => {
  return ({ resData }) => {
    return (
      <div className="relative">
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center space-x-1">
          <span>🌱</span>
          <span className="font-medium">Pure Veg</span>
        </div>
        <Restrocards resData={resData} />
      </div>
    );
  };
};

export default Restrocards;