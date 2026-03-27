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
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;
  // @ts-ignore
  const maxReviews = import.meta.env.VITE_MAX_REVIEWS || '3';

  console.log('🔍 Debug fetchGoogleReviews:');
  console.log('  Place ID:', placeId);
  console.log('  Max Reviews:', maxReviews);

  if (!placeId) {
    console.warn('⚠️ Google Reviews: Place ID não configurado. Usando avaliações mockadas.');
    return [];
  }

  try {
    // Verificar cache local
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('✅ Google Reviews: Usando dados em cache');
        return data;
      }
    }

    // Chamar proxy local em vez de chamar a API do Google diretamente
    const proxyUrl = `/api/google-reviews/details?placeId=${placeId}&fields=reviews,rating,user_ratings_total`;
    console.log('📡 Chamando proxy:', proxyUrl);
    
    const response = await fetch(proxyUrl);

    console.log('📡 Response status:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Proxy error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('📡 Proxy response:', data);

    if (data.error) {
      console.warn(`⚠️ Google API Error: ${data.error}`, data.details);
      return [];
    }

    if (!data.result) {
      console.warn('⚠️ Sem result na resposta do proxy');
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

    console.log(`✅ Google Reviews: ${reviews.length} avaliações carregadas`);
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
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID;

  if (!placeId) return null;

  try {
    // Chamar proxy local
    const response = await fetch(
      `/api/google-reviews/details?placeId=${placeId}&fields=rating,user_ratings_total`
    );

    const data = await response.json();

    if (data.error) {
      console.warn(`⚠️ Error fetching rating: ${data.error}`);
      return null;
    }

    if (data.result) {
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
