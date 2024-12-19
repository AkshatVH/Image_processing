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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload a valid image file');
      }

      // Validate file size (max 16MB)
      if (file.size > 16 * 1024 * 1024) {
        throw new Error('Image size should be less than 16MB');
      }

      setIsLoading(true);
      setError(null);
      
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setOriginalImage(objectUrl);
      
      const result = await processImage(file);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the image');
      setResult(null);
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