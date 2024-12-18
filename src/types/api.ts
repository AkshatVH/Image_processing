export interface PredictionResult {
  label: string;
  confidence?: number;
  processedAt: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}