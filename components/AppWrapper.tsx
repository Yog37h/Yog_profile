"use client";

import { useState } from 'react';
import { useResourceLoader } from '@/hooks/useResourceLoader';
import { Preloader } from './ui/Preloader';

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [showContent, setShowContent] = useState(false);
  const { progress, isComplete } = useResourceLoader();

  const handleLoadComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      {!showContent && (
        <Preloader 
          progress={progress} 
          onLoadComplete={handleLoadComplete}
        />
      )}
      
      <div 
        className={`transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </>
  );
};
