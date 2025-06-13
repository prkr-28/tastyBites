// API configuration for different environments
const API_CONFIG = {
  development: {
    baseUrl: '/api', // Uses Vite proxy in development
  },
  production: {
    baseUrl: 'https://api.allorigins.win/raw?url=', // CORS proxy for production
  }
};

const isDevelopment = import.meta.env.DEV;
const config = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

// Helper function to construct API URLs
export const buildApiUrl = (endpoint) => {
  if (isDevelopment) {
    return `${config.baseUrl}${endpoint}`;
  } else {
    // For production, encode the full Swiggy URL
    const swiggyUrl = `https://www.swiggy.com${endpoint}`;
    return `${config.baseUrl}${encodeURIComponent(swiggyUrl)}`;
  }
};

// API functions
export const fetchRestaurants = async (latitude, longitude) => {
  try {
    const endpoint = `/dapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${latitude}&lng=${longitude}&carousel=true&third_party_vendor=1`;
    const url = buildApiUrl(endpoint);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const fetchRestaurantMenu = async (resid, latitude, longitude) => {
  try {
    const endpoint = `/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${resid}&submitAction=ENTER`;
    const url = buildApiUrl(endpoint);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    throw error;
  }
};