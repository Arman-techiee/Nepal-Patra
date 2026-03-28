import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_NEWS_API_BASE_URL,
  params: {
    api_token: import.meta.env.VITE_NEWS_API_TOKEN,
  },
  timeout: 10000,
});

// Request interceptor - log in dev
api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
});

// Response interceptor - normalize errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export default api;
