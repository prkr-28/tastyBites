import { useState, useEffect } from 'react';

const useRestromenu = (resid, latitude = 20.2959847, longitude = 85.8246101) => {
  const [resmenu, setresmenu] = useState(null);

  useEffect(() => {
    if (resid) {
      fetchmenu();
    }
  }, [resid, latitude, longitude]);

  const fetchmenu = async () => {
    try {
      const data = await fetch(
        `/api/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${resid}&submitAction=ENTER`
      );
      const json = await data.json();
      setresmenu(json.data);
    } catch (error) {
      console.error('Error fetching restaurant menu:', error);
      setresmenu(null);
    }
  };
  
  return resmenu;
};

export default useRestromenu;