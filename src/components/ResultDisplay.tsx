import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import type { PredictionResult } from '../types';

interface ResultDisplayProps {
  result: PredictionResult | null;
  originalImage: string | null;
}

export function ResultDisplay({ result, originalImage }: ResultDisplayProps) {
  if (!result || !originalImage) return null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-dark-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-dark-700">
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-dark-100 flex items-center space-x-2">
            <ImageIcon className="w-5 h-5 text-accent-500" />
            <span>Original Image</span>
          </h3>
          <div className="relative group">
            <img
              src={originalImage}
              alt="Original"
              className="w-full aspect-video object-cover rounded-lg border border-dark-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-dark-100 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-accent-500" />
            <span>Analysis Results</span>
          </h3>
          <div className="space-y-4 p-4 bg-dark-900/50 rounded-lg border border-dark-700">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <p className="text-dark-100">Detected Object</p>
                <p className="text-2xl font-semibold text-white">{result.label}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-accent-500 mt-1" />
              <div>
                <p className="text-dark-100">Processed At</p>
                <p className="text-sm text-dark-300">
                  {new Date(result.processedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}