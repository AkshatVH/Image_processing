import { API_ROUTES } from '../config/api';
import { ApiService } from './api';
import type { PredictionResult } from '../types';

export async function processImage(file: File): Promise<PredictionResult> {
  const formData = ApiService.createFormData(file);
  
  const response = await fetch(API_ROUTES.PREDICT, {
    method: 'POST',
    body: formData,
  });

  return ApiService.handleResponse<PredictionResult>(response);
}