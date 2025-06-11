import Restrocards from './Restrocards.jsx';
import { useState, useEffect } from 'react';
import ShimmerUI from './shimmer.jsx';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlinestatus.jsx';
import { withveglabel } from './Restrocards.jsx';

const Body = () => {
  const [listofrestro, setlistofrestro] = useState([]);
  const [filteredrestro, setfilteredrestro] = useState([]);
  const [searchtext, setsearchtext] = useState('');

  const Restrocardwithveglabel = withveglabel(Restrocards);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const data = await fetch(
      '/api/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=20.2959847&lng=85.8246101&carousel=true&third_party_vendor=1'
    );

    const json = await data.json();
    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    setlistofrestro(restaurants);
    setfilteredrestro(restaurants);
  };

  const onlinestatus = useOnlineStatus();

  if (!onlinestatus) {
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

  const handleSearch = () => {
    const filterdlist = listofrestro.filter((res) =>
      res.info.name.toLowerCase().includes(searchtext.toLowerCase())
    );
    setfilteredrestro(
      filterdlist.length === 0 ? listofrestro : filterdlist
    );
    setsearchtext('');
  };

  const handleTopRated = () => {
    const filterdlist = listofrestro.filter(
      (res) => res.info.avgRating >= 4.5
    );
    setfilteredrestro(filterdlist);
  };

  const handleShowAll = () => {
    setfilteredrestro(listofrestro);
  };

  return listofrestro.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 tracking-wider">
            Delicious Food, Delivered Fast! 🍕
          </h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 max-w-2xl mx-auto">
            Discover amazing restaurants near you and get your favorite meals delivered in minutes.
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
                value={searchtext}
                onChange={(e) => setsearchtext(e.target.value)}
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
              onClick={handleShowAll}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              All Restaurants
            </button>
            <button
              onClick={handleTopRated}
              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              ⭐ Top Rated (4.5+)
            </button>
            <button
              onClick={() => {
                const vegRestaurants = listofrestro.filter(res => res.info.veg);
                setfilteredrestro(vegRestaurants);
              }}
              className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              🌱 Pure Veg
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredrestro.length} restaurant{filteredrestro.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredrestro.map((restorent) => (
            <Link
              key={restorent.info.id}
              to={`/restromenu/${restorent.info.id}`}
              className="block transform hover:scale-105 transition-transform duration-200"
            >
              {restorent.info.veg ? (
                <Restrocardwithveglabel resData={restorent} />
              ) : (
                <Restrocards resData={restorent} />
              )}
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredrestro.length === 0 && listofrestro.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No restaurants found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={handleShowAll}
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

export default Body;