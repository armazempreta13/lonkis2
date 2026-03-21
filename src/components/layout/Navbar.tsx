import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Instagram, Facebook, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../../siteConfig';

export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = siteConfig.nav;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex justify-between items-center"
      >
      <Link to="/" className="flex items-center group">
        <div className="flex items-center gap-2">
          <img 
            src={siteConfig.brand.logo} 
            alt={`${siteConfig.brand.name} Logo`} 
            className="h-14 md:h-20 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
        </div>
      </Link>
      
      <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:scale-105 ${
              location.pathname === item.href ? 'text-white' : 'text-white/30 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden xl:flex items-center gap-4 border-r border-white/10 pr-6 mr-2">
          <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-2 group" aria-label={`Ligar para ${siteConfig.contact.phoneDisplay}`}>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all border border-white/10">
              <Phone className="w-4 h-4 text-white group-hover:text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Ligue Agora</span>
              <span className="text-sm font-black text-white">{siteConfig.contact.phoneDisplay}</span>
            </div>
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all border border-white/10" aria-label="Siga-nos no Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-white hover:text-black transition-all border border-white/10" aria-label="Siga-nos no Facebook">
            <Facebook className="w-5 h-5" />
          </a>
        </div>

        <button 
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/95 z-[60] flex flex-col p-8 md:p-12 text-white overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <img 
                src={siteConfig.brand.logo} 
                alt={`${siteConfig.brand.name} Logo`} 
                className="h-12 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 active:scale-95 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-4 mb-12">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black mb-4">Navegação</span>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-4xl sm:text-5xl font-display font-black uppercase tracking-tighter transition-all block py-2 ${
                      location.pathname === item.href ? 'text-white' : 'text-white/20 active:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/10 space-y-10">
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Contato Direto</span>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-5 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 active:bg-white active:text-black transition-all">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Ligue Agora</span>
                      <span className="text-xl font-black tracking-tight">{siteConfig.contact.phoneDisplay}</span>
                    </div>
                  </a>
                </motion.div>
              </div>

              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Redes Sociais</span>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4"
                >
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 border border-white/10 active:bg-white active:text-black transition-all">
                    <Instagram className="w-7 h-7" />
                  </a>
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 border border-white/10 active:bg-white active:text-black transition-all">
                    <Facebook className="w-7 h-7" />
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
