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
      className="pt-32 pb-24 px-6 bg-black min-h-screen relative overflow-hidden"
    >
      <SEO 
        title={`Sobre Nós | ${siteConfig.brand.name}`}
        description="Conheça a história da LK Imports, referência em assistência técnica em Brasília há mais de 17 anos."
      />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-block px-4 py-1 bg-white/5 backdrop-blur-md rounded-full mb-6 lg:mb-8 border border-white/10">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">{siteConfig.about.hero.badge}</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 lg:mb-10 text-white text-balance leading-[0.85]">
              {siteConfig.about.hero.title} <br />
              <span className="text-white/20">{siteConfig.about.hero.titleAccent}</span>
            </h1>
            <div className="space-y-6 lg:space-y-8 text-white/40 text-base sm:text-lg leading-relaxed font-medium">
              {siteConfig.about.hero.paragraphs.map((p, i) => (
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
            <div className="absolute -inset-4 bg-white/5 rounded-[3rem] sm:rounded-[4rem] blur-2xl -z-10 group-hover:bg-white/10 transition-all duration-1000"></div>
            <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-square sm:aspect-auto">
              <img 
                src={siteConfig.about.hero.image} 
                alt="LK Imports Team" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-10">
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/60 font-black mb-2">{siteConfig.about.hero.imageBadge.title}</p>
                <p className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">{siteConfig.about.hero.imageBadge.subtitle}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24 lg:mb-32">
          {siteConfig.about.values.map((item, index) => {
            const Icon = Icons[item.icon as keyof typeof Icons] as React.ElementType;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-10 sm:p-12 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[2.5rem] sm:rounded-[3rem] group hover:bg-white transition-all duration-700 shadow-xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-black transition-all duration-500">
                  {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/20 group-hover:text-white transition-all duration-500" />}
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-black uppercase mb-4 tracking-tight">{item.title}</h3>
                <p className="text-white/30 group-hover:text-black/60 text-xs sm:text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {siteConfig.about.stats.map((item, index) => {
            const Icon = Icons[item.icon as keyof typeof Icons] as React.ElementType;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-8 sm:p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[2.5rem] sm:rounded-[3rem] text-center group hover:bg-white hover:border-white transition-all duration-700 shadow-2xl"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-white/10 group-hover:bg-black/5 group-hover:border-black/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white/20 group-hover:text-black transition-all duration-500" />}
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-black uppercase mb-3 tracking-tight">{item.title}</h3>
                <p className="text-white/30 group-hover:text-black/60 text-xs sm:text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
