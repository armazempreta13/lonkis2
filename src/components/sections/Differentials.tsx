import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../siteConfig';

export const Differentials = () => {
  const { badge, title, titleAccent, description, ctaText, items } = siteConfig.home.differentials;
  return (
    <section id="differentials" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-black block">{badge}</span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-black">
                {title} <br />
                <span className="text-black/20">{titleAccent}</span>
              </h2>
            </div>
            <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed max-w-md">
              {description}
            </p>
            <div className="pt-4">
              <Link to="/sobre" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-black font-black group">
                {ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 sm:p-10 bg-zinc-50 border border-zinc-100 hover:border-black hover:bg-white transition-all duration-700 rounded-[2.5rem] sm:rounded-[3rem] relative overflow-hidden shadow-sm hover:shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-black/10 transition-colors"></div>
                
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 mb-6 sm:mb-8 relative z-10">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-black group-hover:text-white transition-colors" />
                </div>
                
                <div className="relative z-10 space-y-2 sm:space-y-3">
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-black tracking-tight leading-tight">{item.title}</h3>
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
