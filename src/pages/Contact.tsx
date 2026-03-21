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
      className="pt-32 pb-24 px-6 bg-black min-h-screen relative overflow-hidden"
    >
      <SEO 
        title={`Contato | ${siteConfig.brand.name}`}
        description="Entre em contato com a LK Imports. Solicite seu orçamento ou tire suas dúvidas pelo WhatsApp."
      />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-16">
          <div className="inline-block px-4 py-1 bg-white/5 backdrop-blur-md rounded-full mb-6 border border-white/10">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">{contactPage.hero.badge}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white leading-[0.85]">
            {contactPage.hero.title} <br />
            <span className="text-white/20">{contactPage.hero.titleAccent}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-zinc-900/40 backdrop-blur-sm p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 relative overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 sm:space-y-8 relative z-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">{contactPage.form.nameLabel}</label>
                        <input 
                          id="name"
                          type="text" 
                          required
                          className="w-full bg-white/5 border border-white/10 px-5 sm:px-6 py-4 sm:py-5 text-[11px] sm:text-xs text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-2xl font-light placeholder:text-white/10"
                          placeholder={contactPage.form.namePlaceholder}
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="whatsapp" className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">{contactPage.form.whatsappLabel}</label>
                        <input 
                          id="whatsapp"
                          type="tel" 
                          required
                          className="w-full bg-white/5 border border-white/10 px-5 sm:px-6 py-4 sm:py-5 text-[11px] sm:text-xs text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-2xl font-light placeholder:text-white/10"
                          placeholder={contactPage.form.whatsappPlaceholder}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="subject" className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">{contactPage.form.subjectLabel}</label>
                      <div className="relative">
                        <select 
                          id="subject"
                          className="w-full bg-white/5 border border-white/10 px-5 sm:px-6 py-4 sm:py-5 text-[11px] sm:text-xs text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-2xl appearance-none font-light cursor-pointer"
                        >
                          {contactPage.form.subjects.map((subject, idx) => (
                            <option key={idx} className="bg-zinc-900">{subject}</option>
                          ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="message" className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/30 font-black ml-1">{contactPage.form.messageLabel}</label>
                      <textarea 
                        id="message"
                        rows={5}
                        required
                        className="w-full bg-white/5 border border-white/10 px-5 sm:px-6 py-4 sm:py-5 text-[11px] sm:text-xs text-white focus:outline-none focus:border-white focus:ring-4 focus:ring-white/5 transition-all rounded-2xl resize-none font-light placeholder:text-white/10"
                        placeholder={contactPage.form.messagePlaceholder}
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full py-5 sm:py-6 rounded-2xl text-[9px] sm:text-[10px] tracking-[0.3em] transition-all shadow-2xl shadow-white/5 font-black uppercase">
                      {contactPage.form.buttonText}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 sm:py-24 text-center space-y-6 sm:space-y-8"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-white/5">
                      <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">Mensagem Enviada!</h3>
                      <p className="text-white/40 font-light max-w-xs mx-auto leading-relaxed text-xs sm:text-sm">{contactPage.form.successMessage}</p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors font-black"
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
            className="space-y-8 sm:space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <a href={`tel:${contact.phone}`} className="p-8 sm:p-10 bg-zinc-900/40 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 hover:bg-white hover:border-white transition-all group duration-700 shadow-xl" aria-label={`Ligar para ${contact.phoneDisplay}`}>
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white/20 mb-6 group-hover:text-black group-hover:scale-110 transition-all duration-500" />
                <h3 className="font-display font-black uppercase text-white group-hover:text-black mb-2 tracking-tight text-lg sm:text-xl">Ligue Agora</h3>
                <p className="text-white/30 group-hover:text-black/60 text-xs sm:text-sm font-light tracking-widest">{contact.phoneDisplay}</p>
              </a>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="p-8 sm:p-10 bg-zinc-900/40 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 hover:bg-white hover:border-white transition-all group duration-700 shadow-xl" aria-label="Falar pelo WhatsApp">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white/20 mb-6 group-hover:text-black group-hover:scale-110 transition-all duration-500" />
                <h3 className="font-display font-black uppercase text-white group-hover:text-black mb-2 tracking-tight text-lg sm:text-xl">{contactPage.info.whatsappTitle}</h3>
                <p className="text-white/30 group-hover:text-black/60 text-xs sm:text-sm font-light tracking-widest uppercase">{contactPage.info.whatsappDesc}</p>
              </a>
            </div>

            <div className="p-8 sm:p-10 bg-zinc-900/40 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 shadow-xl">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white/20 mb-6" />
              <h3 className="font-display font-black uppercase text-white mb-2 tracking-tight text-lg sm:text-xl">{contactPage.info.addressTitle}</h3>
              <p className="text-white/30 text-xs sm:text-sm mb-8 font-light leading-relaxed">{contact.address}</p>
              <div className="h-64 sm:h-72 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-white/5 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 group shadow-inner relative">
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

            <div className="flex gap-4 sm:gap-6">
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-900/40 rounded-2xl sm:rounded-3xl flex items-center justify-center border border-white/5 hover:bg-white hover:text-black transition-all duration-500 shadow-lg" aria-label="Siga-nos no Instagram">
                <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
              <a href={social.facebook.url} target="_blank" rel="noopener noreferrer" className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-900/40 rounded-2xl sm:rounded-3xl flex items-center justify-center border border-white/5 hover:bg-white hover:text-black transition-all duration-500 shadow-lg" aria-label="Siga-nos no Facebook">
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
