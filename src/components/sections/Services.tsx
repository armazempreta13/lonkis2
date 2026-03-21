import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { QuoteModal } from '../ui/QuoteModal';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../siteConfig';

export const Services = () => {
  const [selectedService, setSelectedService] = useState<{title: string, price: string} | null>(null);

  const { badge, title, titleAccent, description, ctaText, items } = siteConfig.pages.home.services;

  return (
    <section id="services" className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block"
            >
              {badge}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]"
            >
              {title} <br />
              <span className="text-white/20">{titleAccent}</span>
            </motion.h2>
          </div>
          <div className="space-y-6">
            <p className="text-white/40 max-w-md font-medium leading-relaxed">
              {description}
            </p>
            <Link to="/servicos" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white font-black group">
              {ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((service, index) => {
            const Icon = service.icon;
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-zinc-900/40 backdrop-blur-sm p-8 sm:p-12 flex flex-col items-start hover:bg-white transition-all duration-700 border border-white/5 hover:border-white rounded-[2.5rem] sm:rounded-[3.5rem] relative overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between w-full items-start mb-10 sm:mb-16 relative z-10">
                <span className="font-display text-5xl sm:text-7xl font-black text-white/5 group-hover:text-black/5 transition-colors">
                  0{index + 1}
                </span>
                <div className="p-4 sm:p-6 bg-white/5 rounded-[1.2rem] sm:rounded-[1.5rem] group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                  <Icon className="w-6 h-6 sm:w-10 sm:h-10 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </div>
              
              <div className="relative z-10 space-y-3 sm:space-y-4 mb-10 sm:mb-12">
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-black uppercase tracking-tight transition-colors leading-tight">{service.title}</h3>
                <p className="text-white/40 group-hover:text-black/60 font-black text-base sm:text-lg tracking-tight">{service.price}</p>
                <p className="text-white/30 group-hover:text-black/40 text-xs sm:text-sm leading-relaxed font-medium transition-colors">{service.description}</p>
              </div>
              
              <Button 
                className="mt-auto w-full py-6 bg-white/5 text-white border border-white/10 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]"
                onClick={() => setSelectedService({title: service.title, price: service.price})}
                ariaLabel={`Solicitar orçamento para ${service.title}`}
              >
                Solicitar Orçamento
              </Button>
            </motion.div>
          )})}
        </div>
      </div>
      
      {selectedService && (
        <QuoteModal 
          isOpen={!!selectedService} 
          onClose={() => setSelectedService(null)} 
          serviceName={selectedService.title}
          price={selectedService.price}
        />
      )}
    </section>
  );
};
