import React from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { ErrorDisplay } from './components/ErrorDisplay';
import { useImageUpload } from './hooks/useImageUpload';

export default function App() {
  const {
    isLoading,
    error,
    result,
    originalImage,
    handleImageSelect,
  } = useImageUpload();

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Header />
        <div className="space-y-8">
          <ImageUploader
            onImageSelect={handleImageSelect}
            isLoading={isLoading}
          />
          <ErrorDisplay error={error} />
          <ResultDisplay result={result} originalImage={originalImage} />
        </div>
      </div>
    </div>
  );
}