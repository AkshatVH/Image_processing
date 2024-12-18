import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  src: string;
}

export function ImagePreview({ src }: ImagePreviewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-dark-100 flex items-center space-x-2">
        <ImageIcon className="w-5 h-5 text-accent-500" />
        <span>Original Image</span>
      </h3>
      <div className="relative group">
        <img
          src={src}
          alt="Original"
          className="w-full aspect-video object-cover rounded-lg border border-dark-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}