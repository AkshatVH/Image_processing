export interface DropzoneOptions {
  onDrop: (files: File[]) => void;
  accept?: Record<string, string[]>;
  disabled?: boolean;
}

export interface ImageInputProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}