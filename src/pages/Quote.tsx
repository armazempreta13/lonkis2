import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState, FormEvent } from 'react';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../siteConfig';

export const Quote = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedService, setSelectedService] = useState('');

  const scrollToForm = () => {
    const section = document.getElementById('quote-form');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    scrollToForm();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const quotePage = siteConfig.pages.quote;
  const { contact, social } = siteConfig;

  const filteredServices = selectedCategory === 'todos'
    ? quotePage.services
    : quotePage.services.filter(service => service.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 bg-black min-h-screen relative overflow-hidden"
    >
      <SEO
        title={`Orçamento | ${siteConfig.brand.name}`}
        description="Solicite seu orçamento gratuito na LK Imports. Avaliação técnica especializada e preços transparentes para reparos de smartphones e tablets."
      />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 bg-white/5 backdrop-blur-md rounded-full mb-4 sm:mb-6 border border-white/10">
            <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-bold">{quotePage.hero.badge}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-3 sm:mb-4 text-white leading-[0.85]">
            {quotePage.hero.title} <br />
            <span className="text-white/20">{quotePage.hero.titleAccent}</span>
          </h1>
          <p className="text-white/40 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed font-light">
            {quotePage.hero.description}
          </p>
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2 sm:mb-3 md:mb-4 text-white">
              Como <span className="text-white/20">Funciona</span>
            </h2>
            <p className="text-white/40 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
              Processo simples e transparente para você ter o melhor atendimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {quotePage.process.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 sm:p-6 md:p-8 lg:p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] text-center group hover:bg-white hover:border-white transition-all duration-700 hover:shadow-2xl"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/5 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 md:mb-6 group-hover:bg-black group-hover:scale-110 transition-all duration-500 mx-auto">
                    {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white/40 group-hover:text-white" />}
                  </div>
                  <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase text-white group-hover:text-black mb-2 sm:mb-3 md:mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/40 group-hover:text-black/60 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2 sm:mb-3 md:mb-4 text-white">
              Serviços <span className="text-white/20">Disponíveis</span>
            </h2>
            <p className="text-white/40 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light mb-6 sm:mb-8">
              Selecione o tipo de reparo que você precisa
            </p>

            {/* Category Filter */}
            <div className="flex gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {quotePage.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0 transition-all min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
                    selectedCategory === category.id
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 sm:p-5 md:p-6 lg:p-8 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2rem] group hover:bg-white hover:border-white transition-all duration-700 hover:shadow-2xl flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:scale-110 transition-all duration-500">
                      {Icon && <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-white/40 group-hover:text-white" />}
                    </div>
                    <span className="text-[7px] sm:text-[8px] font-bold text-white/20 group-hover:text-black/40 uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase text-white group-hover:text-black mb-1.5 sm:mb-2 tracking-tight">
                    {service.name}
                  </h3>
                  <p className="text-white/40 group-hover:text-black/60 text-[9px] sm:text-xs md:text-sm leading-relaxed font-medium mb-3 sm:mb-4 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-black">
                      {service.price}
                    </span>
                    <button
                      className="px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 bg-white/5 group-hover:bg-black text-white/60 group-hover:text-white text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all min-h-[36px] flex items-center justify-center"
                      onClick={() => handleServiceSelect(service.name)}
                      aria-label={`Solicitar orçamento de ${service.name}`}
                    >
                      Solicitar
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quote Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-5 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    id="quote-form"
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 relative z-10"
                  >
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-black uppercase text-white mb-2 sm:mb-3 md:mb-4 tracking-tight">
                        Solicitar Orçamento
                      </h3>
                      <p className="text-white/40 text-[9px] sm:text-xs md:text-sm font-light">
                        Preencha os dados abaixo e entraremos em contato
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                      <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                        <label htmlFor="name" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">Nome Completo</label>
                        <input
                          id="name"
                          type="text"
                          required
                          className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[44px] flex items-center text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl font-light placeholder:text-white/10"
                          placeholder="Como podemos te chamar?"
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                        <label htmlFor="whatsapp" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">WhatsApp</label>
                        <input
                          id="whatsapp"
                          type="tel"
                          required
                          className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[44px] flex items-center text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl font-light placeholder:text-white/10"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      <label htmlFor="device" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">Dispositivo</label>
                      <input
                        id="device"
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[44px] flex items-center text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl font-light placeholder:text-white/10"
                        placeholder="Ex: iPhone 14 Pro, Samsung S23"
                      />
                    </div>

                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      <label htmlFor="service" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">Serviço Necessário</label>
                      <div className="relative">
                        <select
                          id="service"
                          value={selectedService || undefined}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[44px] flex items-center text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl appearance-none font-light cursor-pointer"
                        >
                          <option value="" disabled hidden>
                            Selecione um serviço
                          </option>
                          {selectedService && !quotePage.form.serviceOptions.includes(selectedService) && (
                            <option value={selectedService}>{selectedService}</option>
                          )}
                          {quotePage.form.serviceOptions.map((option, idx) => (
                            <option key={idx} className="bg-zinc-900" value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 sm:right-5 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      <label htmlFor="description" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">Descrição do Problema</label>
                      <textarea
                        id="description"
                        rows={3}
                        required
                        className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[100px] sm:min-h-[120px] md:min-h-[140px] text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl resize-none font-light placeholder:text-white/10"
                        placeholder="Descreva detalhadamente o problema do seu aparelho..."
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg sm:rounded-xl md:rounded-2xl text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] transition-all shadow-2xl shadow-white/5 font-black uppercase min-h-[44px] flex items-center justify-center">
                      Solicitar Orçamento Gratuito
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 sm:py-16 md:py-20 text-center space-y-4 sm:space-y-5 md:space-y-6"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto ring-6 sm:ring-8 ring-white/5">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                    </div>
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight">Orçamento Solicitado!</h3>
                      <p className="text-white/40 font-light max-w-xs mx-auto leading-relaxed text-[9px] sm:text-xs md:text-sm">
                        Recebemos sua solicitação. Entraremos em contato em até 2 horas com o orçamento detalhado.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/20 hover:text-white transition-colors font-black"
                    >
                      Fazer nova solicitação
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
          >
            {/* Why Choose Us */}
            <div className="p-4 sm:p-5 md:p-8 lg:p-10 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] shadow-xl">
              <h3 className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-black uppercase text-white mb-4 sm:mb-5 md:mb-6 tracking-tight">
                Por que nos escolher?
              </h3>
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {quotePage.benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/40" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-white/40 text-[8px] sm:text-[9px] md:text-xs leading-relaxed font-light">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <a href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} className="p-4 sm:p-5 md:p-6 lg:p-8 bg-zinc-900/40 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2rem] border border-white/5 hover:bg-white hover:border-white transition-all group duration-700 shadow-xl block min-h-[100px] sm:min-h-[110px] flex items-center" aria-label="WhatsApp">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-green-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">
                      WhatsApp
                    </h4>
                    <p className="text-white/40 group-hover:text-black/60 text-[8px] sm:text-[9px] md:text-xs font-light">
                      Atendimento rápido e direto
                    </p>
                  </div>
                </div>
              </a>

              <a href={`tel:${contact.phone}`} className="p-4 sm:p-5 md:p-6 lg:p-8 bg-zinc-900/40 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2rem] border border-white/5 hover:bg-white hover:border-white transition-all group duration-700 shadow-xl block min-h-[100px] sm:min-h-[110px] flex items-center" aria-label={`Ligar para ${contact.phoneDisplay}`}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-black group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-white/40 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">
                      Ligação Direta
                    </h4>
                    <p className="text-white/40 group-hover:text-black/60 text-[8px] sm:text-[9px] md:text-xs font-light">
                      {contact.phoneDisplay}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};