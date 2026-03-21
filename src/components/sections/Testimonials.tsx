import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../siteConfig';

interface Review {
  name: string;
  rating: number;
  text: string;
  initial: string;
  color: string;
  time?: string;
  profilePhotoUrl?: string;
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
  profilePhotoUrl: item.image
})) || [];

export const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [overallRating, setOverallRating] = useState(5.0);
  const [totalReviews, setTotalReviews] = useState(124);

  useEffect(() => {
    // To make this 100% functional and dynamic, add VITE_GOOGLE_PLACES_API_KEY to your .env file
    // and VITE_GOOGLE_PLACES_PLACE_ID for the specific place you want to fetch reviews from.
    // We use the fallback data for testing as requested ("coloca desse pra testar").
    const apiKey = (import.meta as any).env.VITE_GOOGLE_PLACES_API_KEY;
    const placeId = (import.meta as any).env.VITE_GOOGLE_PLACES_PLACE_ID || 'ChIJP1hJOMm_W5MR9pafUPQ5Nts'; // Placeholder Place ID

    if (!apiKey) {
      console.warn('VITE_GOOGLE_PLACES_API_KEY is not set. Using fallback reviews for testing.');
      setReviews(FALLBACK_REVIEWS);
      setLoading(false);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      const win = window as any;
      if (!win.google || !win.google.maps || !win.google.maps.places) {
        setReviews(FALLBACK_REVIEWS);
        setLoading(false);
        return;
      }

      const service = new win.google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails({
        placeId: placeId,
        fields: ['reviews', 'rating', 'user_ratings_total']
      }, (place: any, status: any) => {
        if (status === win.google.maps.places.PlacesServiceStatus.OK && place?.reviews) {
          const formattedReviews = place.reviews.map((review: any) => ({
            name: review.author_name,
            rating: review.rating,
            text: review.text,
            initial: review.author_name.charAt(0).toUpperCase(),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            time: review.relative_time_description,
            profilePhotoUrl: review.profile_photo_url
          }));
          setReviews(formattedReviews);
          if (place.rating) setOverallRating(place.rating);
          if (place.user_ratings_total) setTotalReviews(place.user_ratings_total);
        } else {
          console.error('Failed to fetch reviews:', status);
          setReviews(FALLBACK_REVIEWS);
        }
        setLoading(false);
      });
    };

    script.onerror = () => {
      console.error('Failed to load Google Maps script');
      setReviews(FALLBACK_REVIEWS);
      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="py-32 px-6 bg-brand-gray overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block"
            >
              {siteConfig.pages.home.testimonials?.badge || 'Avaliações Reais'}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
            >
              {siteConfig.pages.home.testimonials?.title || 'O que dizem'} <br />
              <span className="text-white/20">{siteConfig.pages.home.testimonials?.titleAccent || 'Nossos Clientes'}</span>
            </motion.h2>
          </div>
          
          <div className="flex flex-col items-stretch sm:items-start md:items-end gap-6 w-full md:w-auto">
            <div className="flex items-center justify-center sm:justify-start gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
              <div className="flex gap-1">
                {[...Array(Math.round(overallRating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-white font-black text-sm">{overallRating.toFixed(1)} no Google</span>
              <span className="text-white/40 text-xs">({totalReviews} avaliações)</span>
            </div>
            <Button 
              className="bg-white hover:bg-gray-200 text-black w-full sm:w-auto px-10 py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-white/5 text-[10px] font-black uppercase tracking-[0.2em]"
              onClick={() => window.open(siteConfig.contact.whatsapp, '_blank')}
            >
              <MessageCircle className="w-5 h-5" />
              {siteConfig.pages.home.testimonials?.ctaText || 'Ver todas as avaliações'}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-white/20 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 text-left relative hover:shadow-2xl transition-all duration-700 group flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  {review.profilePhotoUrl ? (
                    <img 
                      src={review.profilePhotoUrl} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full object-cover shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${review.color} shadow-sm`}>
                      {review.initial}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate text-base">{review.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      {review.time && (
                        <span className="text-xs text-gray-500">{review.time}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                      alt="Google" 
                      className="h-4 w-auto opacity-80" 
                    />
                  </div>
                </div>
                
                <div className="relative flex-grow">
                  <p className="text-gray-600 text-sm leading-relaxed relative z-10 line-clamp-6">
                    {review.text}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
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
          className="mt-20 flex flex-col items-center gap-8"
        >
          <button 
            className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black hover:text-white transition-colors border-b border-white/10 pb-2"
            onClick={() => window.open('https://www.google.com/maps/place/Armaz%C3%A9m+da+Preta/@-15.8158668,-48.1652517,17z/data=!4m8!3m7!1s0x935bcfc43849ebf7:0xdb3639f4509f96f6!8m2!3d-15.8158668!4d-48.1626768!9m1!1b1!16s%2Fg%2F11fnfl55wx?entry=ttu', '_blank')}
          >
            Ver todas as avaliações no Google
          </button>

          <div className="inline-flex items-center gap-3 bg-white/5 px-8 py-3 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-[9px] text-white/40 uppercase tracking-[0.3em] font-black">
              Certificado: <span className="text-white">Trustindex</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
