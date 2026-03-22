import { useEffect, useRef, useState } from 'react';

export const useLazyImage = () => {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          const img = ref.current;
          const src = img.dataset.src;
          const srcSet = img.dataset.srcset;

          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          if (srcSet) {
            img.srcset = srcSet;
            img.removeAttribute('data-srcset');
          }

          img.onload = () => {
            img.classList.add('loaded');
            setIsLoaded(true);
          };

          observer.unobserve(img);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isLoaded };
};
