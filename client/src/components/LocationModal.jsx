import React, { useState, useEffect } from "react";

const LocationModal = ({
  isOpen,
  onClose,
  onLocationSelect,
  currentLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiResults, setApiResults] = useState([]);

  const popularCities = [
    { name: "Mumbai", lat: 19.076, lng: 72.8777 },
    { name: "Delhi", lat: 28.7041, lng: 77.1025 },
    { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
    { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
    { name: "Chennai", lat: 13.0827, lng: 80.2707 },
    { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
    { name: "Pune", lat: 18.5204, lng: 73.8567 },
    { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    { name: "Bhubaneswar", lat: 20.2959847, lng: 85.8246101 },
    { name: "Cuttack", lat: 20.4625, lng: 85.8828 },
  ];

  const handleCitySelect = (city) => {
    onLocationSelect(city.lat, city.lng, city.name);
    onClose();
  };

  const handleApiAddressSelect = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const address = result.display_name;
    onLocationSelect(lat, lon, address);
    onClose();
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      if (searchQuery.length < 3) {
        setApiResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        setApiResults(data);
      } catch (err) {
        console.error("Address fetch error:", err);
        setApiResults([]);
      }
    };

    const debounce = setTimeout(fetchAddresses, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold">Select Location</h2>
            <button
              onClick={onClose}
              className="text-white bg-transparent rounded-full px-2 hover:bg-amber-500 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-sm opacity-90 mt-2">
            Choose your location to see restaurants near you
          </p>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh]">
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for your city or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Current Location Display */}
          {currentLocation && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <span className="font-semibold">Current:</span>{" "}
                {currentLocation.address}
              </p>
            </div>
          )}

          {/* Search Results */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Search Results
            </h3>
            <div className="space-y-2">
              {/* Filtered Popular Cities */}
              {popularCities
                .filter((city) =>
                  city.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleCitySelect(city)}
                    className="w-full text-left px-4 py-3 hover:bg-purple-50 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-purple-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-purple-600"
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
                      </div>
                      <span className="font-medium text-gray-800">
                        {city.name}
                      </span>
                    </div>
                  </button>
                ))}

              {/* API Address Results */}
              {apiResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApiAddressSelect(result)}
                  className="w-full text-left px-4 py-3 hover:bg-pink-50 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-pink-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-pink-600"
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
                    </div>
                    <span className="font-medium text-gray-800">
                      {result.display_name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* No Results Fallback */}
          {searchQuery &&
            popularCities.filter((city) =>
              city.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 &&
            apiResults.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No results found for "{searchQuery}"
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
