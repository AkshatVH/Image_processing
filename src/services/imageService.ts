import { API_ROUTES } from '../config/api';
import type { PredictionResult } from '../types';

export async function processImage(file: File): Promise<PredictionResult> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(API_ROUTES.PREDICT, {
      method: 'POST',
      body: formData,
      // Remove mode: 'cors' as it's not needed when proper CORS headers are set by the server
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to process image');
    }

    const result = await response.json();
    return {
      label: result.label,
      confidence: result.confidence,
      processedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Image processing error:', error);
    throw error instanceof Error ? error : new Error('Failed to process image');
  }
}