import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: 20.2959847, // Default Bhubaneswar coordinates
    longitude: 85.8246101,
    address: 'Bhubaneswar, Odisha',
    loading: false,
    error: null
  });

  const getCurrentLocation = () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by this browser.'
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Try to get address from coordinates using reverse geocoding
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
          );
          
          let address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          
          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results[0]) {
              const components = data.results[0].components;
              address = `${components.city || components.town || components.village || ''}, ${components.state || components.country || ''}`.replace(/^,\s*/, '');
            }
          }

          setLocation({
            latitude,
            longitude,
            address,
            loading: false,
            error: null
          });
        } catch (error) {
          setLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            loading: false,
            error: null
          });
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        setLocation(prev => ({
          ...prev,
          loading: false,
          error: errorMessage
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const setCustomLocation = (lat, lng, addr) => {
    setLocation({
      latitude: lat,
      longitude: lng,
      address: addr,
      loading: false,
      error: null
    });
  };

  return {
    location,
    getCurrentLocation,
    setCustomLocation
  };
};

export default useLocation;