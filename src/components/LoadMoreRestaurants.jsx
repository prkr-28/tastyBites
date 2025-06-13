import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Restrocards from './Restrocards';
import { withveglabel } from './Restrocards';
import ShimmerUI from './shimmer';
import useLocation from '../utils/useLocation';
import useOnlineStatus from '../utils/useOnlinestatus';
import { fetchMoreRestaurants } from '../utils/api';

const LoadMoreRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const { location } = useLocation();
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart);
  
  const RestrocardWithVegLabel = withveglabel(Restrocards);

  useEffect(() => {
    fetchInitialRestaurants();
  }, [location.latitude, location.longitude]);

  const fetchInitialRestaurants = async () => {
    setIsLoading(true);
    setError(null);
    setOffset(0);
    
    try {
      const data = await fetchMoreRestaurants(location.latitude, location.longitude, 0);
      const restaurantList = extractRestaurants(data);
      
      setRestaurants(restaurantList);
      setFilteredRestaurants(restaurantList);
      setOffset(16); // Start next offset at 16
      setHasMore(restaurantList.length >= 16);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError('Failed to load restaurants. Please try again.');
      setRestaurants([]);
      setFilteredRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreRestaurants = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    
    try {
      const data = await fetchMoreRestaurants(location.latitude, location.longitude, offset);
      const newRestaurants = extractRestaurants(data);
      
      if (newRestaurants.length === 0) {
        setHasMore(false);
      } else {
        const updatedRestaurants = [...restaurants, ...newRestaurants];
        setRestaurants(updatedRestaurants);
        
        // Apply current filter to new data
        applyFilter(activeFilter, updatedRestaurants);
        
        setOffset(prev => prev + 16);
        setHasMore(newRestaurants.length >= 16);
      }
    } catch (error) {
      console.error('Error loading more restaurants:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const extractRestaurants = (data) => {
    // Try different possible data structures from Swiggy API
    const possiblePaths = [
      data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      data?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      data?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
    ];

    for (const path of possiblePaths) {
      if (path && Array.isArray(path) && path.length > 0) {
        return path;
      }
    }

    return [];
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      applyFilter(activeFilter, restaurants);
      return;
    }

    const filtered = restaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
      res.info.cuisines.some(cuisine => 
        cuisine.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    
    setFilteredRestaurants(filtered);
    setSearchText('');
  };

  const applyFilter = (filterType, restaurantList = restaurants) => {
    setActiveFilter(filterType);
    
    let filtered = [...restaurantList];
    
    switch (filterType) {
      case 'topRated':
        filtered = restaurantList.filter((res) => res.info.avgRating >= 4.5);
        break;
      case 'veg':
        filtered = restaurantList.filter((res) => res.info.veg);
        break;
      case 'fastDelivery':
        filtered = restaurantList.filter((res) => res.info.sla.deliveryTime <= 30);
        break;
      case 'lowPrice':
        filtered = restaurantList.filter((res) => {
          const costString = res.info.costForTwo || '';
          const cost = parseInt(costString.replace(/[^\d]/g, ''));
          return cost <= 300;
        });
        break;
      default:
        filtered = restaurantList;
    }
    
    setFilteredRestaurants(filtered);
  };

  if (!onlineStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
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

  if (isLoading) {
    return <ShimmerUI />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-xl sm:text-2xl font-semibold text-red-700 mb-2">
            Something went wrong!
          </h1>
          <p className="text-red-600 text-sm sm:text-base mb-4">{error}</p>
          <button
            onClick={fetchInitialRestaurants}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white hover:text-yellow-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </Link>
            
            {cartItems.length > 0 && (
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                </svg>
                <span>Cart ({cartItems.length})</span>
              </Link>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            All Restaurants 🍽️
          </h1>
          <p className="text-sm sm:text-base opacity-90">
            Discover all restaurants delivering to {location.address}
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm sm:text-base"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              🔍 Search
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => applyFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              All Restaurants
            </button>
            <button
              onClick={() => applyFilter('topRated')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                activeFilter === 'topRated'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
              }`}
            >
              ⭐ Top Rated (4.5+)
            </button>
            <button
              onClick={() => applyFilter('veg')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                activeFilter === 'veg'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 hover:bg-green-200 text-green-800'
              }`}
            >
              🌱 Pure Veg
            </button>
            <button
              onClick={() => applyFilter('fastDelivery')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                activeFilter === 'fastDelivery'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
            >
              ⚡ Fast Delivery (≤30 min)
            </button>
            <button
              onClick={() => applyFilter('lowPrice')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                activeFilter === 'lowPrice'
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 hover:bg-orange-200 text-orange-800'
              }`}
            >
              💰 Budget Friendly (≤₹300)
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} 
            {activeFilter !== 'all' && ` (${activeFilter} filter applied)`}
          </p>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={`/restromenu/${restaurant.info.id}`}
              className="block transform hover:scale-105 transition-transform duration-200"
            >
              {restaurant.info.veg ? (
                <RestrocardWithVegLabel resData={restaurant} />
              ) : (
                <Restrocards resData={restaurant} />
              )}
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={loadMoreRestaurants}
              disabled={loadingMore}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Loading more...</span>
                </div>
              ) : (
                'Load More Restaurants 🍽️'
              )}
            </button>
          </div>
        )}

        {/* No More Results */}
        {!hasMore && restaurants.length > 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              You've seen all restaurants!
            </h3>
            <p className="text-gray-500">
              That's all the restaurants available in your area.
            </p>
          </div>
        )}

        {/* No Results */}
        {filteredRestaurants.length === 0 && restaurants.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => applyFilter('all')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Show All Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadMoreRestaurants;