import Restrocards from "./Restrocards.jsx";
import { useState, useEffect } from "react";
import ShimmerUI from "./shimmer.jsx";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlinestatus.jsx";
import { withveglabel } from "./Restrocards.jsx";
import useLocation from "../utils/useLocation.jsx";
import LocationModal from "./LocationModal.jsx";
import { fetchRestaurants } from "../utils/api.js";

const Body = () => {
  const [listofrestro, setlistofrestro] = useState([]);
  const [filteredrestro, setfilteredrestro] = useState([]);
  const [searchtext, setsearchtext] = useState("");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { location, getCurrentLocation, setCustomLocation } = useLocation();

  const Restrocardwithveglabel = withveglabel(Restrocards);

  useEffect(() => {
    fetchdata();
  }, [location.latitude, location.longitude]);

  const fetchdata = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const json = await fetchRestaurants(location.latitude, location.longitude);
      const restaurants =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setlistofrestro(restaurants);
      setfilteredrestro(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError("Failed to load restaurants. Please try again.");
      // Fallback to empty array if API fails
      setlistofrestro([]);
      setfilteredrestro([]);
    } finally {
      setIsLoading(false);
    }
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
    setfilteredrestro(filterdlist.length === 0 ? listofrestro : filterdlist);
    setsearchtext("");
  };

  const handleTopRated = () => {
    const filterdlist = listofrestro.filter((res) => res.info.avgRating >= 4.5);
    setfilteredrestro(filterdlist);
  };

  const handleShowAll = () => {
    setfilteredrestro(listofrestro);
  };

  const handleLocationSelect = (lat, lng, address) => {
    setCustomLocation(lat, lng, address);
  };

  const handleGetCurrentLocation = () => {
    getCurrentLocation();
  };

  const handleRetry = () => {
    fetchdata();
  };

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
            onClick={handleRetry}
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        {/* Floating Food SVGs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Pizza SVG */}
          <div
            className="absolute top-10 left-10 animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          >
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-300 opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>

          {/* Burger SVG */}
          <div
            className="absolute top-10 right-16 animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          >
            <svg
              className="w-10 h-10 sm:w-14 sm:h-14 text-orange-300 opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M1 21h22l-2-7H3l-2 7zM5 12h14l1-4H4l1 4zm4-6.5C9 4.12 10.12 3 11.5 3S14 4.12 14 5.5 12.88 8 11.5 8 9 6.88 9 5.5z" />
            </svg>
          </div>

          {/* Taco SVG */}
          <div
            className="absolute bottom-20 left-20 animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "3.5s" }}
          >
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 text-green-300 opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          {/* Donut SVG */}
          <div
            className="absolute bottom-20 right-20 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
          >
            <svg
              className="w-10 h-10 sm:w-14 sm:h-14 text-pink-300 opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
          </div>

          {/* Ice Cream SVG */}
          <div
            className="absolute top-40 left-1/3 animate-bounce"
            style={{ animationDelay: "1.5s", animationDuration: "3.8s" }}
          >
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 text-blue-300 opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 4v3h5.5l2.5 2.5L15.5 7H21V4H5zM7 10v8l5-3 5 3v-8H7z" />
            </svg>
          </div>

          {/* Coffee SVG */}
          <div
            className="absolute top-40 right-1/3 animate-bounce"
            style={{ animationDelay: "2.5s", animationDuration: "4.2s" }}
          >
            <svg
              className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-200 opacity-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 21h20v-2H2v2zM20 8H4V6h16v2zM12 15c2.21 0 4-1.79 4-4V8H8v3c0 2.21 1.79 4 4 4z" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4 tracking-wider">
            Delicious Food, Delivered Fast! 🍕
          </h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90 max-w-2xl mx-auto mb-4">
            Discover amazing restaurants near you and get your favorite meals
            delivered in minutes.
          </p>

          {/* Location Display */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm sm:text-base opacity-90">
              Delivering to:{" "}
              <span className="font-semibold">{location.address}</span>
            </span>
          </div>

          {/* Location Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleGetCurrentLocation}
              disabled={location.loading}
              className="bg-white bg-opacity-20 hover:bg-gray-200 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base disabled:opacity-50 cursor-pointer"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="black"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>

              <span className="text-black">
                {location.loading
                  ? "Getting Location..."
                  : "Use Current Location"}
              </span>
            </button>

            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="bg-white bg-opacity-20 hover:bg-gray-200 text-black font-medium px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base cursor-pointer"
            >
              Change Location
            </button>
          </div>

          {location.error && (
            <p className="text-yellow-200 text-sm mt-2">{location.error}</p>
          )}
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
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
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
                const vegRestaurants = listofrestro.filter(
                  (res) => res.info.veg
                );
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
            Showing {filteredrestro.length} restaurant
            {filteredrestro.length !== 1 ? "s" : ""} near {location.address}
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
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={handleShowAll}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Show All Restaurants
            </button>
          </div>
        )}
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={handleLocationSelect}
        currentLocation={location}
      />
    </div>
  );
};

export default Body;