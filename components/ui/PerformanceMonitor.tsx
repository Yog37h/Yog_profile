"use client";

import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_PERF_MONITOR === 'true') {
      const measurePerformance = () => {
        // Wait for page to be fully loaded
        if (document.readyState === 'complete') {
          // Measure LCP
          if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              console.log('🚀 LCP:', lastEntry.startTime.toFixed(2) + 'ms');
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Measure CLS
            const clsObserver = new PerformanceObserver((list) => {
              let clsValue = 0;
              for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                  clsValue += entry.value;
                }
              }
              console.log('📊 CLS:', clsValue.toFixed(4));
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });

            // Measure FID
            const fidObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                console.log('⚡ FID:', entry.processingStart - entry.startTime + 'ms');
              }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Measure resource loading times
            const resourceObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.name.includes('.avif') || entry.name.includes('.webp')) {
                  console.log('🖼️ Image Load:', entry.name.split('/').pop(), (entry.responseEnd - entry.startTime).toFixed(2) + 'ms');
                }
              }
            });
            resourceObserver.observe({ entryTypes: ['resource'] });
          }

          // Basic timing metrics
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            console.log('⏱️ Performance Metrics:');
            console.log('  - DNS Lookup:', (navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2) + 'ms');
            console.log('  - TCP Connection:', (navigation.connectEnd - navigation.connectStart).toFixed(2) + 'ms');
            console.log('  - Request/Response:', (navigation.responseEnd - navigation.requestStart).toFixed(2) + 'ms');
            console.log('  - DOM Content Loaded:', (navigation.domContentLoadedEventEnd - navigation.navigationStart).toFixed(2) + 'ms');
            console.log('  - Page Load Complete:', (navigation.loadEventEnd - navigation.navigationStart).toFixed(2) + 'ms');
          }
        } else {
          // Wait for page to load
          window.addEventListener('load', measurePerformance);
        }
      };

      measurePerformance();
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
