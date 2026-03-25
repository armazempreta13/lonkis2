import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { QuoteModal } from '../components/ui/QuoteModal';
import { ServiceDetailModal } from '../components/ui/ServiceDetailModal';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../siteConfig';

export const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<{title: string, price: string} | null>(null);
  const [serviceDetailsOpen, setServiceDetailsOpen] = useState(false);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredServices = useMemo(() => {
    return siteConfig.pages.services.items.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "Todos" || service.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 sm:pt-40 md:pt-48 pb-24 px-4 sm:px-6 md:px-12 bg-black min-h-screen relative overflow-hidden"
    >
      <SEO 
        title={`Serviços | ${siteConfig.brand.name}`}
        description="Conserto de tela, bateria, conectores e reparos em placa para todas as marcas de celulares."
      />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-white/5 backdrop-blur-md rounded-full mb-6 border border-white/10"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">{siteConfig.pages.services.hero.badge}</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-white leading-[0.85]"
          >
            {siteConfig.pages.services.hero.title} <br />
            <span className="text-white/20">{siteConfig.pages.services.hero.titleAccent}</span>
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="flex flex-wrap sm:flex-nowrap sm:overflow-x-auto gap-3 pb-4 sm:pb-0 w-full lg:w-auto no-scrollbar">
              {siteConfig.pages.services.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 sm:px-6 py-3 rounded-full text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-black transition-all border whitespace-nowrap ${
                    activeCategory === cat 
                      ? "bg-white text-black border-white" 
                      : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Icons.Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="BUSCAR SERVIÇO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-[9px] sm:text-[10px] uppercase tracking-widest focus:outline-none focus:border-white/40 transition-all font-black"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
                >
                  <Icons.X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-zinc-900/40 p-8 sm:p-10 flex flex-col items-start hover:bg-zinc-800 transition-all duration-700 border border-white/5 hover:border-white/40 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
                  </div>

                  <div className="flex justify-between w-full items-start mb-10 sm:mb-12">
                    <span className="font-display text-5xl sm:text-6xl font-black text-white/5 group-hover:text-white/5 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="p-4 sm:p-5 bg-white/5 rounded-[1.2rem] sm:rounded-[1.5rem] group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                      {Icon && <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/40 group-hover:text-black transition-colors" />}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-8 sm:mb-10">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/30 group-hover:text-white/50 font-black block">{service.category}</span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white group-hover:text-white mb-2 uppercase tracking-tight transition-colors leading-tight">{service.name}</h3>
                    <p className="text-white/40 group-hover:text-white/60 font-black text-base sm:text-lg tracking-tight">{service.price}</p>
                  </div>
                  
                  <div className="mt-auto w-full space-y-3 flex flex-col gap-3">
                    <Button 
                      className="w-full py-5 bg-white text-black hover:bg-white/90 border border-white transition-all rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]"
                      onClick={() => setSelectedService({title: service.name, price: service.price})}
                      ariaLabel={`Solicitar orçamento para ${service.name}`}
                    >
                      Solicitar Orçamento
                    </Button>
                    <Button 
                      className="w-full py-3 bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2"
                      onClick={() => {
                        setSelectedServiceDetails({
                          title: service.name,
                          description: service.description || 'Serviço especializado de reparação',
                          details: [
                            'Diagnóstico completo',
                            'Execução por especialistas',
                            'Peças de qualidade premium',
                            'Teste final de funcionamento',
                          ],
                          warranty: '90 dias',
                          timeline: 'Consulte para prazo'
                        });
                        setServiceDetailsOpen(true);
                      }}
                      ariaLabel={`Saiba mais sobre ${service.name}`}
                    >
                      <Icons.Info className="w-3.5 h-3.5" />
                      Saiba Mais
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredServices.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <Icons.Search className="w-16 h-16 text-white/5 mx-auto mb-6" />
            <h3 className="font-display text-2xl font-black text-white/20 uppercase tracking-widest">Nenhum serviço encontrado</h3>
            <button 
              onClick={() => { setSearchTerm(""); setActiveCategory("Todos"); }}
              className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white font-black transition-colors"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}

        {/* Dispositivos Suportados */}
        <div className="mt-32 pt-32 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold block mb-4">{siteConfig.pages.services.supportedDevices.badge}</span>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
              {siteConfig.pages.services.supportedDevices.title} <br />
              <span className="text-white/20">{siteConfig.pages.services.supportedDevices.titleAccent}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.pages.services.supportedDevices.brands.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.brand}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-10 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:bg-white group transition-all duration-700"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-black flex items-center justify-center mb-8 transition-colors duration-500">
                    {Icon && <Icon className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />}
                  </div>
                  <h3 className="font-display text-2xl font-black text-white group-hover:text-black mb-6 uppercase tracking-tight transition-colors">{item.brand}</h3>
                  <ul className="space-y-3">
                    {item.models.map((model) => (
                      <li key={model} className="text-white/40 group-hover:text-black/60 text-[10px] uppercase tracking-widest font-black flex items-center gap-3 transition-colors">
                        <div className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-black/20" />
                        {model}
                      </li>
                    ))}
                    <li className="text-white/20 group-hover:text-black/40 text-[10px] uppercase tracking-widest font-black pt-4 border-t border-white/5 group-hover:border-black/5 transition-colors">
                      + Muitos outros modelos
                    </li>
                  </ul>
                </motion.div>
              );
            })}
          </div>
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

      {selectedServiceDetails && (
        <ServiceDetailModal
          isOpen={serviceDetailsOpen}
          onClose={() => setServiceDetailsOpen(false)}
          service={selectedServiceDetails}
        />
      )}
    </motion.div>
  );
};
