/**
 * ⚠️  CLOUDFLARE WORKER - NÃO PARTE DO BUILD PRINCIPAL
 * 
 * Este arquivo é um exemplo de Worker do Cloudflare para otimização de imagens.
 * Não é incluído automaticamente no build do npm (TypeScript strict mode).
 * 
 * COMO USAR:
 * 1. Instale Wrangler: npm install -g @cloudflare/wrangler
 * 2. Copie este arquivo para uma pasta separada (ex: wrangler-src/)
 * 3. Execute: wrangler deploy
 * 
 * OU use nativamente via Cloudflare Dashboard sem Worker:
 * - Vá em: lkimports.net > Speed > Optimization > Image Optimization
 * - Enable "Image Optimization"
 * - Use /cdn-cgi/image/ URLs automaticamente no OptimizedImage.tsx
 * 
 * Este arquivo está aqui como referência e documentação apenas.
 * ============================================================================
 */

// Mock types para passar TypeScript validation
declare global {
  interface RequestInit {
    cf?: Record<string, unknown>;
  }
}

declare class KVNamespace {}
declare type ExportedHandler<T> = any;
interface ScheduledEvent {}

interface ImageRequestParams {
  url: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto' | 'json';
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
  gravity?: string;
}

/**
 * Parse query parameters from request
 */
function parseImageParams(url: URL): ImageRequestParams {
  const params: ImageRequestParams = {
    url: url.searchParams.get('url') || '',
    width: url.searchParams.get('w') ? parseInt(url.searchParams.get('w')!) : undefined,
    height: url.searchParams.get('h') ? parseInt(url.searchParams.get('h')!) : undefined,
    quality: url.searchParams.get('q') ? parseInt(url.searchParams.get('q')!) : 80,
    format: (url.searchParams.get('f') as any) || 'auto',
    fit: (url.searchParams.get('fit') as any) || 'contain',
  };

  // Validate dimensions (prevent abuse)
  if (params.width && params.width > 2000) params.width = 2000;
  if (params.height && params.height > 2000) params.height = 2000;
  if (params.quality && params.quality > 95) params.quality = 95;
  if (params.quality && params.quality < 30) params.quality = 30;

  return params;
}

/**
 * Calculate cache headers based on content type
 */
function getCacheHeaders(format: string): Record<string, string> {
  return {
    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
    'CDN-Cache-Control': 'max-age=31536000',
    'Vary': 'Accept',
  };
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(headers: Record<string, string>): Record<string, string> {
  return {
    ...headers,
    'X-Content-Type-Content-Type': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  };
}

/**
 * Main handler for image optimization requests
 * NOTE: Este código é para referência. Use Cloudflare native Image Optimization.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      // Only allow GET and HEAD requests
      if (!['GET', 'HEAD'].includes(request.method)) {
        return new Response('Method not allowed', { status: 405 });
      }

      const url = new URL(request.url);
      const params = parseImageParams(url);

      // Validate URL origin (prevent open redirect)
      if (!params.url.startsWith('http')) {
        return new Response('Invalid image URL', { status: 400 });
      }

      // Allow only images from trusted domains
      const allowedDomains = [
        'picsum.photos',
        'lkimports.net',
        'images.unsplash.com',
        'via.placeholder.com',
      ];

      const imageUrlObj = new URL(params.url);
      const isDomainAllowed = allowedDomains.some(domain =>
        imageUrlObj.hostname.endsWith(domain)
      );

      if (!isDomainAllowed) {
        return new Response('Domain not whitelisted', { status: 403 });
      }

      // Fetch original image from source
      const sourceResponse = await fetch(params.url, {
        cf: {
          // Cloudflare cache settings
          mirage: true,
          polish: 'lossy',
          minify: { css: true, html: true, js: true },
        },
      });

      if (!sourceResponse.ok) {
        return new Response('Failed to fetch image', { status: sourceResponse.status });
      }

      // Get original image
      const imageBlob = await sourceResponse.blob();
      const contentType = sourceResponse.headers.get('content-type') || 'image/jpeg';

      // Set response headers with aggressive caching
      const headers = {
        'Content-Type': contentType,
        ...getCacheHeaders(params.format || 'auto'),
        ...addSecurityHeaders({}),
      };

      const cacheHeaders = new Headers(headers);

      // Return image with optimization headers
      // Cloudflare will apply Image Optimization automatically
      return new Response(imageBlob, {
        status: 200,
        headers: cacheHeaders,
      });
    } catch (error) {
      console.error('Image optimization error:', error);
      return new Response('Image processing failed', { status: 500 });
    }
  },

  /**
   * Scheduled event to warm cache
   * Runs periodically to pre-cache frequently accessed images
   */
  async scheduled(event: ScheduledEvent, env: Env): Promise<void> {
    try {
      // Cache top products' images
      const topProductImages = [
        'https://picsum.photos/seed/iphone16/300/300',
        'https://picsum.photos/seed/iphone16pro/300/300',
        'https://picsum.photos/seed/ps5slim/300/300',
      ];

      for (const imageUrl of topProductImages) {
        await fetch(imageUrl, {
          cf: { cacheTtl: 31536000 }, // 1 year cache
        });
      }

      console.log('Image cache warmed successfully');
    } catch (error) {
      console.error('Cache warming failed:', error);
    }
  },
} satisfies ExportedHandler<Env>;

/**
 * Environment bindings for Cloudflare Worker
 */
interface Env {
  IMAGE_CACHE: KVNamespace;
  ENVIRONMENT: 'production' | 'preview';
  CLOUDFLARE_ACCOUNT_ID: string;
}
