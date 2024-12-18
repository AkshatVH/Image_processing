import { useState, useCallback } from 'react';
import { processImage } from '../services/imageService';
import type { PredictionResult } from '../types';

export function useImageUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const handleImageSelect = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      setOriginalImage(URL.createObjectURL(file));
      
      const result = await processImage(file);
      setResult({
        ...result,
        processedAt: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    result,
    originalImage,
    handleImageSelect,
  };
}