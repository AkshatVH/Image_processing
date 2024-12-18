import React from 'react';

export function Title() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent-500 to-purple-500 text-transparent bg-clip-text">
        Vision AI Analyzer
      </h1>
      <p className="text-lg text-dark-100">
        Upload an image and let our advanced ML model analyze it for you
      </p>
    </>
  );
}