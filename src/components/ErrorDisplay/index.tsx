import React from 'react';

interface ErrorDisplayProps {
  error: string | null;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="w-full max-w-xl mx-auto p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
      <p className="text-red-400">{error}</p>
    </div>
  );
}