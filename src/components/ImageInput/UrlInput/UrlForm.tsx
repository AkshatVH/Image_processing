import React, { useState } from 'react';
import { Link } from 'lucide-react';

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Link className="h-5 w-5 text-dark-400" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter image URL..."
          className="block w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent text-white placeholder-dark-400"
          disabled={isLoading}
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !url.trim()}
        className="w-full px-4 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            <span>Loading...</span>
          </>
        ) : (
          <span>Fetch Image</span>
        )}
      </button>
    </form>
  );
}