import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../siteConfig';

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 bg-black min-h-screen relative overflow-hidden"
    >
      <SEO 
        title={`Sobre Nós | ${siteConfig.brand.name}`}
        description="Conheça a história da LK Imports, referência em assistência técnica em Brasília há mais de 17 anos."
      />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center mb-16 sm:mb-20 md:mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block px-3 sm:px-4 py-1 bg-white/5 backdrop-blur-md rounded-full mb-4 sm:mb-6 md:mb-8 border border-white/10">
              <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">{siteConfig.pages.about.hero.badge}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-6 sm:mb-8 md:mb-10 text-white text-balance leading-[0.85]">
              {siteConfig.pages.about.hero.title} <br />
              <span className="text-white/20">{siteConfig.pages.about.hero.titleAccent}</span>
            </h1>
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-white/40 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
              {siteConfig.pages.about.hero.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-white/5 rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] blur-2xl -z-10 group-hover:bg-white/10 transition-all duration-1000"></div>
            <div className="relative rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-square sm:aspect-auto">
              <img 
                src={siteConfig.pages.about.hero.image} 
                alt="LK Imports Team" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8">
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/60 font-black mb-1 sm:mb-2">{siteConfig.pages.about.hero.imageBadge.title}</p>
                <p className="text-base sm:text-xl md:text-2xl font-display font-black text-white uppercase tracking-tight">{siteConfig.pages.about.hero.imageBadge.subtitle}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
          {siteConfig.pages.about.values.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-6 sm:p-8 md:p-10 lg:p-12 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[1.75rem] sm:rounded-[2.5rem] md:rounded-[3rem] group hover:bg-white transition-all duration-700 shadow-xl"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 group-hover:bg-black transition-all duration-500">
                  {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white/20 group-hover:text-white transition-all duration-500" />}
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white group-hover:text-black uppercase mb-3 sm:mb-4 tracking-tight">{item.title}</h3>
                <p className="text-white/30 group-hover:text-black/60 text-xs sm:text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {siteConfig.pages.about.stats.items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-6 sm:p-8 md:p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[1.75rem] sm:rounded-[2.5rem] md:rounded-[3rem] text-center group hover:bg-white hover:border-white transition-all duration-700 shadow-2xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 border border-white/10 group-hover:bg-black/5 group-hover:border-black/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {Icon && <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white/20 group-hover:text-black transition-all duration-500" />}
                </div>
                <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl text-white group-hover:text-black uppercase mb-2 sm:mb-3 tracking-tight">{item.value}</h3>
                <p className="text-white/30 group-hover:text-black/60 text-xs sm:text-sm font-light leading-relaxed">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
