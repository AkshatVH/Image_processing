import React from 'react';
import { CheckCircle, Clock, Sparkles } from 'lucide-react';
import type { PredictionResult } from '../../types';

interface AnalysisResultsProps {
  result: PredictionResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
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
  );
}