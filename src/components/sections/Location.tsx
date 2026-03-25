import { motion } from 'motion/react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { siteConfig } from '../../siteConfig';

export const Location = () => {
  return (
    <section id="location" className="py-4 sm:py-20 md:py-28 px-4 sm:px-6 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-12 md:mb-16 gap-2 sm:gap-6 md:gap-8">
          <div className="space-y-1 sm:space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/40 font-black block"
            >
              {siteConfig.pages.home.location.badge}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white"
            >
              {siteConfig.pages.home.location.title} <br />
              <span className="text-white/20">{siteConfig.pages.home.location.titleAccent}</span>
            </motion.h2>
          </div>
          <p className="text-white/40 max-w-xs font-medium text-sm sm:text-base leading-relaxed">
            {siteConfig.pages.home.location.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-4 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-5 md:p-8 lg:p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] group hover:bg-white transition-all duration-700 hover:shadow-2xl"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/5 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white/40 group-hover:text-white" />
              </div>
              <h3 className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase text-white group-hover:text-black mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 tracking-tight">Endereço</h3>
              <p className="text-white/40 group-hover:text-black/60 text-[9px] sm:text-xs md:text-sm leading-relaxed font-medium uppercase tracking-widest whitespace-pre-line">
                {siteConfig.contact.address}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4 sm:p-5 md:p-8 lg:p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] group hover:bg-white transition-all duration-700 hover:shadow-2xl"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/5 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white/40 group-hover:text-white" />
              </div>
              <h3 className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase text-white group-hover:text-black mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 tracking-tight">Horários</h3>
              <p className="text-white/40 group-hover:text-black/60 text-[9px] sm:text-xs md:text-sm leading-relaxed font-medium uppercase tracking-widest whitespace-pre-line">
                {`Segunda a Sexta: ${siteConfig.contact.hours.mondayToFriday}\nSábado: ${siteConfig.contact.hours.saturday}\nDomingo: ${siteConfig.contact.hours.sunday}\nFeriados: ${siteConfig.contact.hours.holiday}`}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4 sm:p-5 md:p-8 lg:p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] group hover:bg-white transition-all duration-700 hover:shadow-2xl"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/5 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 lg:mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white/40 group-hover:text-white" />
              </div>
              <h3 className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase text-white group-hover:text-black mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 tracking-tight">Contato</h3>
              <p className="text-white/40 group-hover:text-black/60 text-[9px] sm:text-xs md:text-sm leading-relaxed font-medium uppercase tracking-widest">
                {siteConfig.contact.phoneDisplay}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
