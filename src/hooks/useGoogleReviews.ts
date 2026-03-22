import { useState, useEffect } from 'react';
import { fetchGoogleReviews, fetchGoogleRating } from '../services/googleReviewsService';

interface Review {
  name: string;
  text: string;
  rating: number;
  image?: string;
}

interface RatingData {
  rating: number;
  totalReviews: number;
}

interface UseGoogleReviewsResult {
  reviews: Review[];
  ratingData: RatingData | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook para buscar reviews do Google
 * Se não tiver credenciais configuradas, retorna vazio
 * O componente usa as avaliações mockadas como fallback
 */
export const useGoogleReviews = (): UseGoogleReviewsResult => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingData, setRatingData] = useState<RatingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      
      try {
        // Buscar reviews e ratings em paralelo
        const [reviewsData, ratingInfo] = await Promise.all([
          fetchGoogleReviews(),
          fetchGoogleRating(),
        ]);

        if (reviewsData.length > 0) {
          setReviews(reviewsData);
          console.log('✅ Google reviews loaded successfully');
        } else {
          // Se não tem reviews do Google, usa mockadas
          console.log('ℹ️ No Google reviews fetched, using fallback');
        }

        if (ratingInfo) {
          setRatingData(ratingInfo);
        }

        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reviews';
        setError(errorMessage);
        console.error('Error loading Google reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  return { reviews, ratingData, isLoading, error };
};
