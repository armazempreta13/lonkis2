import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../siteConfig';
import { MessageCircle } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-4 sm:py-20 md:py-28 px-4 sm:px-6 bg-black overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-8 md:gap-12 lg:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 sm:space-y-8 md:space-y-10"
        >
          <div className="space-y-2 sm:space-y-5 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
            >
              <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-black">{siteConfig.pages.home.cta.badge}</span>
            </motion.div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter">
              {siteConfig.pages.home.cta.title} <span className="text-white/20">{siteConfig.pages.home.cta.titleAccent}</span>
            </h2>
          </div>
          
          <div className="space-y-3 sm:space-y-4 md:space-y-5 text-white/40 text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-lg">
            <p>
              {siteConfig.pages.home.cta.subtitle1}
            </p>
            <p>
              {siteConfig.pages.home.cta.subtitle2}
            </p>
            <p className="text-[9px] sm:text-[10px] md:text-xs opacity-60">
              {siteConfig.pages.home.cta.subtitle3}
            </p>
          </div>

          <Button 
            className="w-full sm:w-auto px-5 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-5 lg:py-6 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] rounded-lg sm:rounded-xl md:rounded-2xl transition-all flex items-center justify-center gap-2 sm:gap-3 md:gap-4 shadow-2xl shadow-white/5"
            onClick={() => window.open(siteConfig.contact.whatsapp, '_blank')}
            ariaLabel={siteConfig.pages.home.cta.buttonText}
          >
            <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
            {siteConfig.pages.home.cta.buttonText}
          </Button>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-4xl lg:rounded-[3.5rem] shadow-2xl group border border-white/10"
          >
            <div className="absolute inset-0 bg-white/5 blur-3xl -z-10 group-hover:bg-white/10 transition-colors duration-1000"></div>
            <img 
              src={siteConfig.pages.home.cta.image} 
              alt="LK Imports Solutions" 
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.05] group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </motion.div>
          
          {/* Floating badge effect */}
          <motion.div 
            initial={{ opacity: 0, y: 40, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 -left-8 sm:-left-10 md:-left-12 bg-white text-black px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12 rounded-2xl sm:rounded-3xl md:rounded-[3.5rem] shadow-2xl hidden md:flex flex-col items-center justify-center border border-black/5 z-20"
          >
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl md:rounded-[3.5rem] -z-10"></div>
            <p className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none mb-1 sm:mb-2">{siteConfig.pages.home.cta.floatingBadge.number}</p>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black text-black/40 whitespace-pre-line">{siteConfig.pages.home.cta.floatingBadge.text}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
