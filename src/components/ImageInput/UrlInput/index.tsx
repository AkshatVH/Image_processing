import React, { useState } from 'react';
import { UrlForm } from './UrlForm';
import { fetchImageFromUrl } from '../../../utils/imageUtils';
import { ErrorDisplay } from '../../ErrorDisplay';

interface UrlInputProps {
  onImageSelect: (file: File) => void;
  onCancel: () => void;
}

export function UrlInput({ onImageSelect, onCancel }: UrlInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const imageFile = await fetchImageFromUrl(url);
      onImageSelect(imageFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch image from URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <UrlForm onSubmit={handleUrlSubmit} isLoading={isLoading} />
      <ErrorDisplay error={error} />
      <button
        onClick={onCancel}
        className="w-full px-4 py-2 text-dark-300 hover:text-white transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}