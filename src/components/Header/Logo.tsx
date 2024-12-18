import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center justify-center mb-4 space-x-3">
      <Brain className="w-12 h-12 text-accent-500" />
      <Sparkles className="w-8 h-8 text-accent-500 animate-pulse-slow" />
    </div>
  );
}