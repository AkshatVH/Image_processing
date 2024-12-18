import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export function ImageUploader({ onImageSelect, isLoading }: ImageUploaderProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full max-w-xl mx-auto p-8 border-2 border-dashed border-dark-700 rounded-lg hover:border-accent-500 transition-all duration-300 bg-dark-800/50 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {isLoading ? (
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-dark-700 rounded-full" />
            <div className="h-4 w-32 bg-dark-700 rounded" />
          </div>
        ) : (
          <>
            <div className="relative">
              <Upload className="w-12 h-12 text-dark-400" />
              <ImageIcon className="w-6 h-6 text-accent-500 absolute -bottom-1 -right-1" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-dark-100">
                Drag and drop your image here
              </p>
              <p className="text-sm text-dark-400">or</p>
            </div>
            <label className="relative cursor-pointer group">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
                disabled={isLoading}
              />
              <span className="px-6 py-3 text-sm font-medium text-white bg-accent-500 rounded-lg group-hover:bg-accent-600 transition-colors duration-200 inline-flex items-center space-x-2">
                <ImageIcon className="w-4 h-4" />
                <span>Browse Files</span>
              </span>
            </label>
          </>
        )}
      </div>
    </div>
  );
}