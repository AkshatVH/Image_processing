import React from 'react';

interface PreviewImageProps {
  imageUrl: string;
}

export function PreviewImage({ imageUrl }: PreviewImageProps) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-dark-800">
      <img
        src={imageUrl}
        alt="Preview"
        className="w-full aspect-video object-cover"
      />
    </div>
  );
}