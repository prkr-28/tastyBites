import { useState, useEffect } from 'react';
import { fetchRestaurantMenu } from './api.js';

const useRestromenu = (resid, latitude = 20.2959847, longitude = 85.8246101) => {
  const [resmenu, setresmenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resid) {
      fetchmenu();
    }
  }, [resid, latitude, longitude]);

  const fetchmenu = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const json = await fetchRestaurantMenu(resid, latitude, longitude);
      setresmenu(json.data);
    } catch (error) {
      console.error('Error fetching restaurant menu:', error);
      setError('Failed to load menu. Please try again.');
      setresmenu(null);
    } finally {
      setLoading(false);
    }
  };
  
  return { resmenu, loading, error, refetch: fetchmenu };
};

export default useRestromenu;