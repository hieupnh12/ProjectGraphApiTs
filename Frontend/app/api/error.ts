import { ERROR_MESSAGES } from "./config";

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return {
          message: data?.message || "Dữ liệu không hợp lệ",
          code: "BAD_REQUEST",
          status,
        };
      case 401:
        return {
          message: ERROR_MESSAGES.UNAUTHORIZED,
          code: "UNAUTHORIZED",
          status,
        };
      case 403:
        return {
          message: ERROR_MESSAGES.FORBIDDEN,
          code: "FORBIDDEN",
          status,
        };
      case 404:
        return {
          message: ERROR_MESSAGES.NOT_FOUND,
          code: "NOT_FOUND",
          status,
        };
      case 500:
        return {
          message: ERROR_MESSAGES.SERVER_ERROR,
          code: "SERVER_ERROR",
          status,
        };
      default:
        return {
          message: data?.message || ERROR_MESSAGES.UNKNOWN_ERROR,
          code: "UNKNOWN_ERROR",
          status,
        };
    }
  } else if (error.request) {
    // Request made but no response
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      code: "NETWORK_ERROR",
    };
  } else {
    // Error in request setup
    return {
      message: ERROR_MESSAGES.UNKNOWN_ERROR,
      code: "REQUEST_ERROR",
    };
  }
};
