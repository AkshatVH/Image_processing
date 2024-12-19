import React, { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export function FileUpload({ onImageSelect, isLoading }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      className="w-full p-8 border-2 border-dashed border-dark-700 rounded-lg hover:border-accent-500 transition-all duration-300 bg-dark-800/50 cursor-pointer"
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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading}
              />
              <button 
                className="px-6 py-3 mt-2 text-sm font-medium text-white bg-accent-500 rounded-lg hover:bg-accent-600 transition-colors inline-flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Browse Files</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}