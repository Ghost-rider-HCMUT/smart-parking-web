const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/smart-parking',
  ENDPOINTS: {
    LOGIN: '/auth/token',
    REGISTER: '/users',
    PROFILE: '/users/profile',
    PARKING_LOT: '/parking-lot',
    REGISTER_PARKING: '/parking-lot/register'
  }
};

export default API_CONFIG; 