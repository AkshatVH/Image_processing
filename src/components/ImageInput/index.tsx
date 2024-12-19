import React, { useState } from 'react';
import { Camera, Upload, Link } from 'lucide-react';
import { CameraCapture } from './Camera';
import { FileUpload } from './FileUpload';
import { UrlInput } from './UrlInput';

type InputMethod = 'camera' | 'upload' | 'url' | null;

interface ImageInputProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

export function ImageInput({ onImageSelect, isLoading }: ImageInputProps) {
  const [inputMethod, setInputMethod] = useState<InputMethod>(null);

  const renderInputMethod = () => {
    switch (inputMethod) {
      case 'camera':
        return (
          <CameraCapture
            onImageCapture={onImageSelect}
            onCancel={() => setInputMethod(null)}
          />
        );
      case 'upload':
        return (
          <div className="space-y-6">
            <FileUpload onImageSelect={onImageSelect} isLoading={isLoading} />
            <button
              onClick={() => setInputMethod(null)}
              className="w-full px-4 py-2 text-dark-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        );
      case 'url':
        return (
          <UrlInput
            onImageSelect={onImageSelect}
            onCancel={() => setInputMethod(null)}
          />
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setInputMethod('camera')}
              className="flex items-center justify-center space-x-3 p-6 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors group"
            >
              <Camera className="w-8 h-8 text-accent-500 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-medium">Use Camera</span>
            </button>
            <button
              onClick={() => setInputMethod('upload')}
              className="flex items-center justify-center space-x-3 p-6 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors group"
            >
              <Upload className="w-8 h-8 text-accent-500 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-medium">Upload Image</span>
            </button>
            <button
              onClick={() => setInputMethod('url')}
              className="flex items-center justify-center space-x-3 p-6 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors group"
            >
              <Link className="w-8 h-8 text-accent-500 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-medium">Image URL</span>
            </button>
          </div>
        );
    }
  };

  return <div className="space-y-6">{renderInputMethod()}</div>;
}