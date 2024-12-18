// API configuration
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:5000';

export const API_ROUTES = {
  PREDICT: `${API_ENDPOINT}/predict`,
} as const;