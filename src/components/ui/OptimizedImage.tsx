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
}

export const OptimizedImage = ({
  src,
  alt,
  srcSet,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E',
  className = '',
  width,
  height,
  style,
  priority = false,
}: OptimizedImageProps) => {
  const { ref, isLoaded } = useLazyImage();

  if (priority) {
    return (
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        src={src}
        alt={alt}
        srcSet={srcSet}
        className={`${className} will-change-auto`}
        width={width}
        height={height}
        style={style}
        loading="eager"
      />
    );
  }

  return (
    <motion.img
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      src={placeholder}
      data-src={src}
      data-srcset={srcSet}
      alt={alt}
      className={`${className} will-change-auto`}
      width={width}
      height={height}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );
};
