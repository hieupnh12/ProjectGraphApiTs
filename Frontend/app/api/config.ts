// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  TIMEOUT: 10000,
  RETRY_COUNT: 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    GOOGLE: "/auth/google",
    FACEBOOK: "/auth/facebook",
  },
  USERS: {
    GET_PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
  },
  PRODUCTS: {
    LIST: "/products",
    GET_BY_ID: (id: string) => `/products/${id}`,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.",
  UNAUTHORIZED: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
  FORBIDDEN: "Bạn không có quyền truy cập tài nguyên này.",
  NOT_FOUND: "Không tìm thấy dữ liệu yêu cầu.",
  SERVER_ERROR: "Lỗi máy chủ. Vui lòng thử lại sau.",
  UNKNOWN_ERROR: "Có lỗi xảy ra. Vui lòng thử lại.",
};
