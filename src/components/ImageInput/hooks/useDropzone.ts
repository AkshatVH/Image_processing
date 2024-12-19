import { useCallback } from 'react';
import type { DropzoneOptions } from '../types';

export function useDropzone(options: DropzoneOptions) {
  const {
    onDrop,
    accept = { 'image/*': [] },
    disabled = false,
  } = options;

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const acceptedFiles = files.filter(file => {
        const fileType = file.type;
        return Object.keys(accept).some(key => {
          if (key === 'image/*') return fileType.startsWith('image/');
          return key === fileType;
        });
      });

      onDrop(acceptedFiles);
    },
    [onDrop, accept, disabled]
  );

  const getRootProps = useCallback(
    () => ({
      onDrop: handleDrop,
      onDragOver: (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) e.preventDefault();
      },
    }),
    [handleDrop, disabled]
  );

  const getInputProps = useCallback(
    () => ({
      type: 'file',
      accept: Object.keys(accept).join(','),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        onDrop(files);
      },
      disabled,
      className: 'hidden',
    }),
    [onDrop, accept, disabled]
  );

  return {
    getRootProps,
    getInputProps,
    isDragActive: false, // Implement drag state if needed
  };
}