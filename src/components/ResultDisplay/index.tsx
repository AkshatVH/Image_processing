import React from 'react';
import { ImagePreview } from './ImagePreview';
import { AnalysisResults } from './AnalysisResults';
import type { PredictionResult } from '../../types';

interface ResultDisplayProps {
  result: PredictionResult | null;
  originalImage: string | null;
}

export function ResultDisplay({ result, originalImage }: ResultDisplayProps) {
  if (!result || !originalImage) return null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-dark-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-dark-700">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <ImagePreview src={originalImage} />
        <AnalysisResults result={result} />
      </div>
    </div>
  );
}