import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../siteConfig';

export const Differentials = () => {
  const { badge, title, titleAccent, description, ctaText, items } = siteConfig.pages.home.differentials;
  return (
    <section id="differentials" className="py-12 sm:py-20 md:py-28 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-5 sm:space-y-6 md:space-y-8"
          >
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-black/40 font-black block">{badge}</span>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-black">
                {title} <br />
                <span className="text-black/20">{titleAccent}</span>
              </h2>
            </div>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-md">
              {description}
            </p>
            <div className="pt-2 sm:pt-3 md:pt-4">
              <Link to="/sobre" className="inline-flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-black font-black group">
                {ctaText}
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-4 sm:p-6 md:p-8 lg:p-10 bg-zinc-50 border border-zinc-100 hover:border-black hover:bg-white transition-all duration-700 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] relative overflow-hidden shadow-sm hover:shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 bg-black/5 blur-3xl rounded-full -mr-12 sm:-mr-14 md:-mr-16 -mt-12 sm:-mt-14 md:-mt-16 group-hover:bg-black/10 transition-colors"></div>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 mb-4 sm:mb-5 md:mb-6 lg:mb-8 relative z-10">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-black group-hover:text-white transition-colors" />
                </div>
                
                <div className="relative z-10 space-y-1.5 sm:space-y-2 md:space-y-3">
                  <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase text-black tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium group-hover:text-gray-600 transition-colors">{item.description}</p>
                </div>
              </motion.div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
};
