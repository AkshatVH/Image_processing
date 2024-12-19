import React, { useState, useCallback } from 'react';
import { CameraPreview } from './CameraPreview';
import { CaptureControls } from './CaptureControls';
import { PreviewImage } from './PreviewImage';
import { useCameraStream } from './useCameraStream';

interface CameraCaptureProps {
  onImageCapture: (file: File) => void;
  onCancel: () => void;
}

export function CameraCapture({ onImageCapture, onCancel }: CameraCaptureProps) {
  const { videoRef, isStreaming, error, startCamera, stopCamera } = useCameraStream();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);

  const handleCapture = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0);
    
    // Create preview URL
    setPreviewUrl(canvas.toDataURL('image/jpeg'));
    
    // Create file
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        setCapturedImage(file);
      }
    }, 'image/jpeg', 0.95);
  }, [videoRef]);

  const handleRetake = useCallback(() => {
    setPreviewUrl(null);
    setCapturedImage(null);
  }, []);

  const handleAccept = useCallback(() => {
    if (capturedImage) {
      onImageCapture(capturedImage);
      stopCamera();
    }
  }, [capturedImage, onImageCapture, stopCamera]);

  return (
    <div className="space-y-4">
      {previewUrl ? (
        <>
          <PreviewImage imageUrl={previewUrl} />
          <CaptureControls
            isPreview={true}
            onCapture={handleCapture}
            onRetake={handleRetake}
            onAccept={handleAccept}
            onCancel={onCancel}
          />
        </>
      ) : (
        <>
          <CameraPreview
            videoRef={videoRef}
            isStreaming={isStreaming}
            error={error}
            onStartCamera={startCamera}
          />
          {isStreaming && (
            <CaptureControls
              isPreview={false}
              onCapture={handleCapture}
              onRetake={handleRetake}
              onAccept={handleAccept}
              onCancel={onCancel}
            />
          )}
        </>
      )}
    </div>
  );
}