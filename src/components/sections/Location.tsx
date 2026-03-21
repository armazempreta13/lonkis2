import { motion } from 'motion/react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { siteConfig } from '../../siteConfig';

export const Location = () => {
  return (
    <section id="location" className="py-32 px-6 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block"
            >
              {siteConfig.pages.home.location.badge}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white"
            >
              {siteConfig.pages.home.location.title} <br />
              <span className="text-white/20">{siteConfig.pages.home.location.titleAccent}</span>
            </motion.h2>
          </div>
          <p className="text-white/40 max-w-xs font-medium leading-relaxed">
            {siteConfig.pages.home.location.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[3rem] group hover:bg-white transition-all duration-700 hover:shadow-2xl"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                <MapPin className="w-6 h-6 text-white/40 group-hover:text-white" />
              </div>
              <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-black mb-4 tracking-tight">Endereço</h3>
              <p className="text-white/40 group-hover:text-black/60 text-sm leading-relaxed font-medium uppercase tracking-widest whitespace-pre-line">
                {siteConfig.contact.address}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[3rem] group hover:bg-white transition-all duration-700 hover:shadow-2xl"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                <Clock className="w-6 h-6 text-white/40 group-hover:text-white" />
              </div>
              <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-black mb-4 tracking-tight">Horários</h3>
              <p className="text-white/40 group-hover:text-black/60 text-sm leading-relaxed font-medium uppercase tracking-widest whitespace-pre-line">
                {siteConfig.contact.hours}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-[3rem] group hover:bg-white transition-all duration-700 hover:shadow-2xl"
            >
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                <Phone className="w-6 h-6 text-white/40 group-hover:text-white" />
              </div>
              <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-black mb-4 tracking-tight">Contato</h3>
              <p className="text-white/40 group-hover:text-black/60 text-sm leading-relaxed font-medium uppercase tracking-widest">
                {siteConfig.contact.phoneDisplay}
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 min-h-[500px] rounded-[4rem] border border-white/10 overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 relative group shadow-2xl"
          >
            <iframe 
              src={siteConfig.contact.mapsEmbed} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              title={`Localização da ${siteConfig.brand.name} no Google Maps`}
              aria-label={`Mapa mostrando a localização da ${siteConfig.brand.name}`}
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-[30px] border-black/20 group-hover:border-transparent transition-all duration-700"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
