import React from 'react';
import { Camera, RotateCcw, Check, X } from 'lucide-react';

interface CaptureControlsProps {
  isPreview: boolean;
  onCapture: () => void;
  onRetake: () => void;
  onAccept: () => void;
  onCancel: () => void;
}

export function CaptureControls({ 
  isPreview,
  onCapture,
  onRetake,
  onAccept,
  onCancel
}: CaptureControlsProps) {
  if (isPreview) {
    return (
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={onRetake}
          className="flex items-center space-x-2 px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake</span>
        </button>
        <button
          onClick={onAccept}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Use Photo</span>
        </button>
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onCapture}
        className="flex items-center space-x-2 px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
      >
        <Camera className="w-5 h-5" />
        <span>Take Photo</span>
      </button>
    </div>
  );
}