import { useState } from 'react';
import ShimmerList from './shimmerList';
import { useParams } from 'react-router-dom';
import useRestromenu from '../utils/useRestromenu';
import useOnlineStatus from '../utils/useOnlinestatus';
import useLocation from '../utils/useLocation';
import RestaurantCateg from './rescategories';

const RestroMenu = () => {
  const { resid } = useParams();
  const { location } = useLocation();
  const resmenu = useRestromenu(resid, location.latitude, location.longitude);
  const onlinestatus = useOnlineStatus();
  const [showindex, setshowindex] = useState(0);

  if (!onlinestatus) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-xl sm:text-2xl font-semibold text-red-700 mb-2">
            Connection Lost!
          </h1>
          <p className="text-red-600 text-sm sm:text-base">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }

  if (resmenu == null) {
    return <ShimmerList />;
  }

  const menuSections =
    resmenu?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.['@type'] ===
        'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
    );

  const restaurantInfo = resmenu?.cards[2]?.card?.card?.info;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Restaurant Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 sm:mb-8">
          <div className="relative">
            <img
              className="w-full h-48 sm:h-56 lg:h-64 object-cover"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurantInfo?.cloudinaryImageId}`}
              alt={restaurantInfo?.name}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                {restaurantInfo?.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
                <span className="bg-green-500 px-2 py-1 rounded-full flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{restaurantInfo?.avgRatingString}</span>
                </span>
                <span className="bg-blue-500 px-2 py-1 rounded-full">
                  {restaurantInfo?.costForTwoMessage}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cuisines</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {restaurantInfo?.cuisines?.join(', ')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {restaurantInfo?.areaName}, {restaurantInfo?.city}
                </p>
              </div>
            </div>
            
            {restaurantInfo?.feeDetails?.message && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  {restaurantInfo.feeDetails.message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              🍽️ Menu
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Menu Categories */}
          <div className="space-y-4">
            {menuSections?.map((category, index) => (
              <RestaurantCateg
                key={category.card.card.title + index}
                data={category?.card?.card}
                showItems={index === showindex}
                setshowindex={() =>
                  setshowindex(index === showindex ? null : index)
                }
              />
            ))}
          </div>

          {(!menuSections || menuSections.length === 0) && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Menu not available
              </h3>
              <p className="text-gray-500">
                Sorry, the menu for this restaurant is currently unavailable.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestroMenu;