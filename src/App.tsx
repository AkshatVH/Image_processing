import React from 'react';
import { Header } from './components/Header';
import { ImageInput } from './components/ImageInput';
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
        <div className="max-w-2xl mx-auto space-y-8">
          <ImageInput
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