import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useState, FormEvent } from 'react';
import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../siteConfig';

export const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactPage = siteConfig.pages.contact;
  const { contact, social } = siteConfig;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 bg-black min-h-screen relative overflow-hidden"
    >
      <SEO 
        title={`Contato | ${siteConfig.brand.name}`}
        description="Entre em contato com a LK Imports. Solicite seu orçamento ou tire suas dúvidas pelo WhatsApp."
      />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 bg-white/5 backdrop-blur-md rounded-full mb-4 sm:mb-6 border border-white/10">
            <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-bold">{contactPage.hero.badge}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-3 sm:mb-4 text-white leading-[0.85]">
            {contactPage.hero.title} <br />
            <span className="text-white/20">{contactPage.hero.titleAccent}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-zinc-900/40 backdrop-blur-sm p-4 sm:p-5 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                      <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                        <label htmlFor="name" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">{contactPage.form.nameLabel}</label>
                        <input 
                          id="name"
                          type="text" 
                          required
                          className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[44px] flex items-center text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl font-light placeholder:text-white/10"
                          placeholder={contactPage.form.namePlaceholder}
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                        <label htmlFor="whatsapp" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">{contactPage.form.whatsappLabel}</label>
                        <input 
                          id="whatsapp"
                          type="tel" 
                          required
                          className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[44px] flex items-center text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl font-light placeholder:text-white/10"
                          placeholder={contactPage.form.whatsappPlaceholder}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      <label htmlFor="subject" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">{contactPage.form.subjectLabel}</label>
                      <div className="relative">
                        <select 
                          id="subject"
                          className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[44px] flex items-center text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl appearance-none font-light cursor-pointer"
                        >
                          {contactPage.form.subjects.map((subject, idx) => (
                            <option key={idx} className="bg-zinc-900">{subject}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 sm:right-5 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      <label htmlFor="message" className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">{contactPage.form.messageLabel}</label>
                      <textarea 
                        id="message"
                        rows={4}
                        required
                        className="w-full bg-white/5 border border-white/10 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 lg:py-5 text-[9px] sm:text-[10px] md:text-xs min-h-[120px] sm:min-h-[140px] md:min-h-[160px] text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-lg sm:rounded-xl md:rounded-2xl resize-none font-light placeholder:text-white/10"
                        placeholder={contactPage.form.messagePlaceholder}
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg sm:rounded-xl md:rounded-2xl text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] transition-all shadow-2xl shadow-white/5 font-black uppercase min-h-[44px] flex items-center justify-center">
                      {contactPage.form.buttonText}
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
                      <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-black uppercase text-white tracking-tight">Mensagem Enviada!</h3>
                      <p className="text-white/40 font-light max-w-xs mx-auto leading-relaxed text-[9px] sm:text-xs md:text-sm">{contactPage.form.successMessage}</p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/20 hover:text-white transition-colors font-black"
                    >
                      Enviar outra mensagem
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
              <a href={`tel:${contact.phone}`} className="p-4 sm:p-5 md:p-6 lg:p-8 bg-zinc-900/40 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border border-white/5 hover:bg-white hover:border-white transition-all group duration-700 shadow-xl min-h-[160px] sm:min-h-[180px] flex flex-col justify-between" aria-label={`Ligar para ${contact.phoneDisplay}`}>
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/20 group-hover:text-black group-hover:scale-110 transition-all duration-500" />
                <div>
                  <h3 className="font-display font-black uppercase text-white group-hover:text-black mb-1 sm:mb-1.5 tracking-tight text-sm sm:text-base md:text-lg">Ligue Agora</h3>
                  <p className="text-white/30 group-hover:text-black/60 text-[8px] sm:text-[9px] md:text-xs font-light tracking-widest">{contact.phoneDisplay}</p>
                </div>
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="p-4 sm:p-5 md:p-6 lg:p-8 bg-zinc-900/40 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border border-white/5 hover:bg-white hover:border-white transition-all group duration-700 shadow-xl min-h-[160px] sm:min-h-[180px] flex flex-col justify-between" aria-label="Falar pelo WhatsApp">
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/20 group-hover:text-black group-hover:scale-110 transition-all duration-500" />
                <div>
                  <h3 className="font-display font-black uppercase text-white group-hover:text-black mb-1 sm:mb-1.5 tracking-tight text-sm sm:text-base md:text-lg">{contactPage.info.whatsappTitle}</h3>
                  <p className="text-white/30 group-hover:text-black/60 text-[8px] sm:text-[9px] md:text-xs font-light tracking-widest uppercase">{contactPage.info.whatsappDesc}</p>
                </div>
              </a>
            </div>

            <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-zinc-900/40 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border border-white/5 shadow-xl">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/20 mb-4 sm:mb-5 md:mb-6" />
              <h3 className="font-display font-black uppercase text-white mb-1.5 sm:mb-2 md:mb-2.5 tracking-tight text-sm sm:text-base md:text-lg">{contactPage.info.addressTitle}</h3>
              <p className="text-white/30 text-[9px] sm:text-[10px] md:text-xs mb-4 sm:mb-5 md:mb-6 lg:mb-8 font-light leading-relaxed">{contact.address}</p>
              <div className="h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-white/5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 group shadow-inner relative">
                <iframe 
                  src={contact.mapsEmbed} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  title="Mapa da localização da LK Imports"
                  aria-label="Mapa mostrando a localização da LK Imports"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 md:gap-5">
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-zinc-900/40 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 hover:bg-white hover:text-black transition-all duration-500 shadow-lg min-h-[44px] min-w-[44px]" aria-label="Siga-nos no Instagram">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </a>
              <a href={social.facebook.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-zinc-900/40 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center border border-white/5 hover:bg-white hover:text-black transition-all duration-500 shadow-lg min-h-[44px] min-w-[44px]" aria-label="Siga-nos no Facebook">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
