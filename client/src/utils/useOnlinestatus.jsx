import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
  const [onlinestatus, setonlinestatus] = useState(true);

  useEffect(() => {
    const handleOffline = () => {
      setonlinestatus(false);
    };

    const handleOnline = () => {
      setonlinestatus(true);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return onlinestatus;
};

export default useOnlineStatus;