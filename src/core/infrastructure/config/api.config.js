const API_CONFIG = {
  BASE_URL: 'https://51fc-2405-4802-8030-4e40-2561-996d-5a77-5d89.ngrok-free.app/smart-parking',
  ENDPOINTS: {
    LOGIN: '/auth/token',
    REGISTER: '/users',
    PROFILE: '/users/my-info',
    PARKING_LOT: '/parking-lot',
    REGISTER_PARKING: '/parking-lot/register',
    CONFIRM_WEBHOOK: '/parking-lot/confirm-webhook', // Đăng ký webhook
    WEBHOOK: '/parking-lot/webhook'                  // Webhook URL nhận sự kiện
  }
};

export default API_CONFIG;
