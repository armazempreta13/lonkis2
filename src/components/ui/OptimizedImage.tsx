import { motion } from 'motion/react';
import { useLazyImage } from '../../hooks/useLazyImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  placeholder?: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  quality?: number; // 1-100, default 80
}

// Generate Cloudflare Image Optimization URL
// Uses /cdn-cgi/image/ to resize, optimize, and serve via Cloudflare's network
const getCloudflareImageUrl = (
  url: string,
  width?: number,
  height?: number,
  quality: number = 80,
  format: 'webp' | 'auto' = 'auto'
): string => {
  if (!url.startsWith('http')) return url;
  
  // Skip optimization for already optimized URLs
  if (url.includes('/cdn-cgi/image/')) return url;
  
  const params = [
    `quality=${quality}`,
    `format=${format}`,
    width ? `width=${width}` : '',
    height ? `height=${height}` : '',
  ]
    .filter(Boolean)
    .join(',');
  
  // Extract domain from URL and apply CF Image Optimization
  try {
    const urlObj = new URL(url);
    // Use Cloudflare's image optimization endpoint
    return `${urlObj.origin}/cdn-cgi/image/${params}${urlObj.pathname}${urlObj.search}`;
  } catch {
    return url;
  }
};

// Generate responsive srcSet with Cloudflare optimization
const generateResponsiveSrcSet = (
  src: string,
  widths: number[] = [300, 600, 900, 1200]
): string => {
  return widths
    .map(w => `${getCloudflareImageUrl(src, w, undefined, 80)} ${w}w`)
    .join(', ');
};

// Ultra-optimized blur placeholder (single pixel)
const BLUR_PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1 1%22%3E%3Crect fill=%22%23224%22 width=%221%22 height=%221%22/%3E%3C/svg%3E';

export const OptimizedImage = ({
  src,
  alt,
  srcSet,
  placeholder = BLUR_PLACEHOLDER,
  className = '',
  width,
  height,
  style,
  priority = false,
  sizes,
  quality = 80,
}: OptimizedImageProps) => {
  const { ref, isLoaded } = useLazyImage();

  // Generate optimized URLs with Cloudflare
  const optimizedSrc = getCloudflareImageUrl(src, width, height, quality, 'auto');
  const optimizedSrcSet = srcSet || generateResponsiveSrcSet(src);

  if (priority) {
    return (
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        src={optimizedSrc}
        srcSet={optimizedSrcSet}
        sizes={sizes}
        alt={alt}
        className={`${className} will-change-image`}
        width={width}
        height={height}
        style={style}
        loading="eager"
        decoding="async"
      />
    );
  }

  return (
    <motion.img
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ 
        opacity: isLoaded ? 1 : 0.1, 
        filter: isLoaded ? 'blur(0px)' : 'blur(10px)' 
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      src={placeholder}
      data-src={optimizedSrc}
      data-srcset={optimizedSrcSet}
      alt={alt}
      className={`${className} will-change-image`}
      width={width}
      height={height}
      style={style}
      loading="lazy"
      decoding="async"
      sizes={sizes}
    />
  );
};
