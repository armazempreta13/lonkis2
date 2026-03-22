/**
 * Google Reviews API Service
 * Integração com Google Places API para buscar avaliações reais
 * 
 * SETUP REQUERIDO:
 * 1. Criar conta em Google Cloud Console: https://console.cloud.google.com/
 * 2. Ativar Google Places API
 * 3. Gerar API Key
 * 4. Encontrar Place ID do seu negócio
 * 5. Adicionar credenciais no .env
 */

interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  time?: number;
  author_name?: string;
  profile_photo_url?: string;
}

interface TransformedReview {
  name: string;
  text: string;
  rating: number;
  image?: string;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em ms
const CACHE_KEY = 'lk_imports_google_reviews';

/**
 * Busca reviews do Google Places API
 */
export const fetchGoogleReviews = async (): Promise<TransformedReview[]> => {
  // @ts-ignore
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  // @ts-ignore
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;
  // @ts-ignore
  const maxReviews = import.meta.env.VITE_MAX_REVIEWS || '3';

  // Validar credenciais
  if (!apiKey || !placeId) {
    console.warn('⚠️ Google Reviews: Credenciais não configuradas. Usando avaliações mockadas.');
    return [];
  }

  try {
    // Verificar cache
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('✅ Google Reviews: Using cached data');
        return data;
      }
    }

    // Buscar da API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=reviews,rating,user_ratings_total`
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.warn(`⚠️ Google API Status: ${data.status}`);
      return [];
    }

    // Transformar reviews
    const reviews: TransformedReview[] = (data.result?.reviews || [])
      .slice(0, parseInt(maxReviews))
      .map((review: GoogleReview) => ({
        name: review.author_name || 'Cliente',
        text: review.text || '',
        rating: review.rating || 5,
        image: review.profile_photo_url,
      }));

    // Cachear resultados
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: reviews,
        timestamp: Date.now(),
      })
    );

    console.log(`✅ Google Reviews: ${reviews.length} reviews fetched`);
    return reviews;
  } catch (error) {
    console.error('❌ Google Reviews Error:', error);
    return [];
  }
};

/**
 * Limpar cache de reviews
 */
export const clearReviewsCache = () => {
  localStorage.removeItem(CACHE_KEY);
};

/**
 * Obter estatísticas do Google
 */
export const fetchGoogleRating = async (): Promise<{ rating: number; totalReviews: number } | null> => {
  // @ts-ignore
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  // @ts-ignore
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=rating,user_ratings_total`
    );

    const data = await response.json();

    if (data.status === 'OK') {
      return {
        rating: data.result?.rating || 0,
        totalReviews: data.result?.user_ratings_total || 0,
      };
    }

    return null;
  } catch (error) {
    console.error('❌ Error fetching Google rating:', error);
    return null;
  }
};
