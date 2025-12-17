import { useMutation } from "@tanstack/react-query";
import apiClient from "./axios";
import { API_ENDPOINTS, API_CONFIG } from "./config";

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  email: string;
  fullName: string;
}

// Auth API functions
export const authAPI = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data),

  signup: (data: SignupRequest) =>
    apiClient.post<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, data),

  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),

  refreshToken: () =>
    apiClient.post<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH_TOKEN),
};

// Hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authAPI.login(credentials),
    onSuccess: (response) => {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => authAPI.signup(data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  });
};
