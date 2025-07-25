"use client";

import { useEffect, useState } from 'react';

interface ResourceLoaderState {
  progress: number;
  isComplete: boolean;
  loadedResources: number;
  totalResources: number;
}

export const useResourceLoader = (): ResourceLoaderState => {
  const [state, setState] = useState<ResourceLoaderState>({
    progress: 0,
    isComplete: false,
    loadedResources: 0,
    totalResources: 0
  });

  useEffect(() => {
    // Critical resources to track
    const criticalResources = [
      // AVIF Images
      '/tol1.avif',
      '/tol2.avif', 
      '/tol3.avif',
      '/m2.avif',
      '/ach2.avif',
      '/astra3.avif',
      '/po1.avif',
      '/po2.avif',
      '/po3.avif',
      '/idea3.avif',
      
      // Critical SVGs
      '/grid.svg',
      '/footer-grid.svg',
      '/java.svg',
      '/c++.svg',
      '/mysqlfis.svg',
      '/git.svg',
      '/docker.svg',
      '/figma.svg',
      '/aws1.svg',
      '/gcp.svg',
      
      // Rolling animation SVGs
      '/djangoproject-ar21.svg',
      '/reactjs-ar21.svg',
      '/express-svgrepo-com.svg',
      '/nodejs.svg',
      '/nextjs.svg',
      '/nestjs.svg',
      '/springio-ar21.svg',
      '/mongodb-ar21.svg',
      '/vuejs.svg',
      '/flutter.svg',
      '/angular.svg',
      '/gitlab.svg',
      
      // Experience SVGs
      '/exp1.svg',
      '/exp2.svg',
      '/exp3.svg',
      '/exp4.svg',
      
      // Project icons
      '/flut.svg',
      '/Appwrite.svg',
      '/gmaps.svg',
      '/openai1.svg',
      '/maven.svg',
      '/dart1.svg',
      '/raspberry.svg',
      '/meta.svg',
      '/express.svg',
      '/post.svg',
      '/re.svg',
      '/babel.svg',
      '/amazon.svg',
      '/airtable.svg',
      '/firebase1.svg',
      '/spring.svg',
      '/swift.svg',
      '/sparkfun.svg',
      '/nfc1.svg',
      '/mongodb.svg'
    ];

    let loadedCount = 0;
    const totalCount = criticalResources.length;

    setState(prev => ({ ...prev, totalResources: totalCount }));

    const updateProgress = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / totalCount) * 100);
      
      setState(prev => ({
        ...prev,
        loadedResources: loadedCount,
        progress,
        isComplete: progress >= 100
      }));
    };

    // Function to preload an image/svg
    const preloadResource = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        
        img.onload = () => {
          updateProgress();
          resolve();
        };
        
        img.onerror = () => {
          // Still count as loaded to prevent hanging
          updateProgress();
          resolve();
        };
        
        img.src = src;
      });
    };

    // Start loading all resources
    const loadAllResources = async () => {
      // Add a minimum loading time for better UX
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
      
      // Load all resources in parallel
      const resourcePromises = criticalResources.map(preloadResource);
      
      // Wait for both minimum time and all resources
      await Promise.all([minLoadTime, ...resourcePromises]);
      
      // Ensure we reach 100% even if some resources failed
      setState(prev => ({
        ...prev,
        progress: 100,
        isComplete: true,
        loadedResources: totalCount
      }));
    };

    loadAllResources();

    // Also track when DOM is fully loaded
    const handleDOMContentLoaded = () => {
      // DOM is ready, but we still wait for resources
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []);

  return state;
};
