import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../siteConfig';
import { useGoogleReviews } from '../../hooks/useGoogleReviews';

interface Review {
  name: string;
  rating: number;
  text: string;
  initial: string;
  color: string;
  time?: string;
  profilePhotoUrl?: string;
  isFromGoogle?: boolean;
}

const COLORS = [
  'bg-blue-600', 'bg-purple-600', 'bg-emerald-600', 
  'bg-orange-600', 'bg-red-600', 'bg-indigo-600', 
  'bg-pink-600', 'bg-teal-600'
];

const FALLBACK_REVIEWS: Review[] = siteConfig.pages.home.testimonials?.items?.map(item => ({
  name: item.name,
  rating: item.rating,
  text: item.text,
  initial: item.name.charAt(0).toUpperCase(),
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  profilePhotoUrl: item.image,
  isFromGoogle: false
})) || [];

export const Testimonials = () => {
  // Verificar se o componente está habilitado no siteConfig
  if (!siteConfig.pages.home.testimonials?.enabled) {
    return null; // Componente desabilitado
  }

  const { reviews: googleReviews, ratingData, isLoading } = useGoogleReviews();
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [overallRating, setOverallRating] = useState(siteConfig.pages.home.testimonials?.googleRating ? parseFloat(siteConfig.pages.home.testimonials.googleRating) : 5.0);
  const [totalReviewsCount, setTotalReviewsCount] = useState(parseInt(siteConfig.pages.home.testimonials?.totalReviews || '150'));

  // Atualizar reviews quando dados do Google chegam
  useEffect(() => {
    if (googleReviews.length > 0) {
      const formattedGoogleReviews: Review[] = googleReviews.map((review, index) => ({
        name: review.name,
        rating: review.rating,
        text: review.text,
        initial: review.name.charAt(0).toUpperCase(),
        color: COLORS[index % COLORS.length],
        profilePhotoUrl: review.image,
        isFromGoogle: true
      }));
      setReviews(formattedGoogleReviews);
    } else {
      // Usar mockadas se não conseguir puxar do Google
      setReviews(FALLBACK_REVIEWS);
    }
  }, [googleReviews]);

  // Atualizar rating quando dados do Google chegam
  useEffect(() => {
    if (ratingData) {
      setOverallRating(ratingData.rating);
      setTotalReviewsCount(ratingData.totalReviews);
    }
  }, [ratingData]);

  return (
    <section className="py-4 sm:py-20 md:py-28 px-4 sm:px-6 bg-brand-gray overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-12 md:mb-16 gap-2 sm:gap-6 md:gap-8">
          <div className="space-y-1 sm:space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-black block"
            >
              {siteConfig.pages.home.testimonials?.badge || 'Avaliações Reais'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]"
            >
              {siteConfig.pages.home.testimonials?.title || 'O que dizem'} <br />
              <span className="text-white/20">{siteConfig.pages.home.testimonials?.titleAccent || 'Nossos Clientes'}</span>
            </motion.h2>
          </div>
          
          <div className="flex flex-col items-stretch gap-2.5 sm:gap-4 w-full md:items-end md:w-auto">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-white/5 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/10">
              <div className="flex gap-0.5 sm:gap-1">
                {[...Array(Math.round(overallRating))].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white font-black text-[9px] sm:text-xs md:text-sm">{overallRating.toFixed(1)} no Google</span>
              <span className="text-white/40 text-[8px] sm:text-[9px]">({totalReviewsCount})</span>
            </div>
            <Button 
              className="bg-white hover:bg-gray-200 text-black w-full px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 shadow-2xl shadow-white/5 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]"
              onClick={() => window.open(siteConfig.contact.whatsapp, '_blank')}
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              Ver avaliações
            </Button>
          </div>
        </div>

        {isLoading && reviews.length === FALLBACK_REVIEWS.length ? (
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <Loader2 className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-emerald-500 animate-spin" />
              <p className="text-white/40 text-xs sm:text-sm">Carregando avaliações...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2rem] shadow-xl border border-gray-100 text-left relative hover:shadow-2xl transition-all duration-700 group flex flex-col h-full"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
                  {review.profilePhotoUrl ? (
                    <img 
                      src={review.profilePhotoUrl} 
                      alt={review.name} 
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg ${review.color} shadow-sm flex-shrink-0`}>
                      {review.initial}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate text-sm sm:text-base">{review.name}</h4>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      {review.time && (
                        <span className="text-[9px] sm:text-xs text-gray-500">{review.time}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-[9px] sm:text-xs font-bold text-blue-600">Google</span>
                  </div>
                </div>
                
                <div className="relative flex-grow">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed relative z-10 line-clamp-5 sm:line-clamp-6">
                    {review.text}
                  </p>
                </div>
                
                <div className="mt-3 sm:mt-4 md:mt-6 pt-2 sm:pt-3 md:pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px] md:text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-blue-500 flex-shrink-0" />
                    Avaliação do Google
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-center gap-4 sm:gap-6 md:gap-8"
        >
          <button 
            className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-black hover:text-white transition-colors border-b border-white/10 pb-1.5 sm:pb-2"
            onClick={() => window.open('https://www.google.com/maps/place/LK+Imports/@-15.867958,-48.106456,17z', '_blank')}
          >
            Ver todas as avaliações no Google
          </button>

          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/5 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></div>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.25em] sm:tracking-[0.3em] font-black">
              Certificado: <span className="text-white">Trustindex</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
