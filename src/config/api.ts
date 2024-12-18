import { getEnvVar } from './env';

// In development, Flask runs on port 5000
export const API_ENDPOINT = getEnvVar('API_ENDPOINT', 'http://localhost:5000');

export const API_ROUTES = {
  PREDICT: `${API_ENDPOINT}/predict`,
} as const;