import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance optimizations
if (import.meta.env.PROD) {
  // Disable console in production
  console.log = () => {};
  console.info = () => {};
  console.debug = () => {};
}

// Prefetch resources for better performance
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Prefetch common resources
    const prefetches = ['/servicos', '/produtos', '/sobre'];
    prefetches.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  });
}

// Register Service Worker for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then(() => console.log('Service Worker registered'))
    .catch((err) => console.log('Service Worker registration failed:', err));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
