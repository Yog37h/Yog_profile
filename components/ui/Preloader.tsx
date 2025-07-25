"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PreloaderProps {
  onLoadComplete: () => void;
  progress?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete, progress = 0 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only hide preloader when progress reaches 100%
    if (progress >= 100) {
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onLoadComplete, 500); // Wait for fade out animation
      }, 800);
    }
  }, [progress, onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      
      {/* Ripple animations */}
      <div className="relative flex items-center justify-center">
        {/* Outer ripple rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border border-purple-500/30 rounded-full animate-ping" 
               style={{ animationDuration: '3s' }} />
          <div className="absolute w-48 h-48 border border-blue-500/40 rounded-full animate-ping" 
               style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
          <div className="absolute w-32 h-32 border border-cyan-500/50 rounded-full animate-ping" 
               style={{ animationDuration: '1.5s', animationDelay: '1s' }} />
        </div>

        {/* Central logo container */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10 flex items-center justify-center animate-pulse">
            <Image
              src="/yog2.png"
              alt="Yogeshwaran Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain animate-bounce"
              style={{ animationDuration: '2s' }}
              priority
            />
          </div>
        </div>

        {/* Rotating outer ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 border-2 border-purple-500/30 rounded-full animate-spin" 
               style={{ animationDuration: '4s' }} />
        </div>
      </div>

      {/* Loading text and progress */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-white text-lg font-medium mb-4 animate-pulse">
          Loading Portfolio...
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress percentage */}
        <div className="text-gray-400 text-sm mt-2">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};
