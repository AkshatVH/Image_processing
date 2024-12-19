import React from 'react';
import { Camera } from 'lucide-react';

interface CameraPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isStreaming: boolean;
  error: string | null;
  onStartCamera: () => void;
}

export function CameraPreview({ videoRef, isStreaming, error, onStartCamera }: CameraPreviewProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
        {error}
      </div>
    );
  }

  if (!isStreaming) {
    return (
      <button
        onClick={onStartCamera}
        className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
      >
        <Camera className="w-5 h-5" />
        <span>Start Camera</span>
      </button>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden bg-dark-800">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full aspect-video object-cover"
      />
    </div>
  );
}