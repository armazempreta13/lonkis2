import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../siteConfig';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-0 pb-16 border-t border-white/5 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Google Maps Integration - Now at the Very Top of Footer */}
      <div className="w-full h-[300px] sm:h-[400px] overflow-hidden border-b border-white/5 relative group">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10"></div>
        <iframe 
          src={siteConfig.contact.mapsEmbed}
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title={`Localização ${siteConfig.brand.name}`}
          className="grayscale invert opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-all duration-1000"
        ></iframe>
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-3rem)] sm:w-auto">
          <a 
            href={siteConfig.contact.mapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 whitespace-nowrap"
          >
            <MapPin size={18} />
            Abrir no Google Maps
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 sm:pt-24 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 sm:gap-20 mb-20 sm:mb-24">
          {/* Brand Info */}
          <div className="space-y-8 sm:space-y-10 text-center sm:text-left">
            <Link to="/" className="inline-block group transition-transform duration-500 hover:scale-105" aria-label="Ir para a página inicial">
              <img 
                src={siteConfig.brand.logo} 
                alt={`${siteConfig.brand.name} Logo`} 
                className="h-20 sm:h-32 w-auto object-contain brightness-0 invert group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all mx-auto sm:mx-0"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-white/30 text-sm font-medium leading-relaxed max-w-xs mx-auto sm:mx-0">
              {siteConfig.footer.description}
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-display font-black uppercase text-[11px] tracking-[0.4em] mb-10 text-white/20">{siteConfig.footer.quickLinksTitle}</h4>
            <ul className="space-y-5 text-sm text-white/40 font-bold uppercase tracking-widest">
              {siteConfig.navbar.navItems.map((item) => (
                <li key={item.label}><Link to={item.href} className="hover:text-white transition-all hover:translate-x-2 inline-block">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display font-black uppercase text-[11px] tracking-[0.4em] mb-10 text-white/20">{siteConfig.footer.contactTitle}</h4>
            <ul className="space-y-8 text-sm text-white/40 font-bold">
              <li className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 text-white/20 group-hover:text-white transition-colors shrink-0 mt-1" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone className="w-5 h-5 text-white/20 group-hover:text-white transition-colors shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="group-hover:text-white transition-colors tracking-widest">{siteConfig.contact.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-4 group">
                <MessageCircle className="w-5 h-5 text-white/20 group-hover:text-white transition-colors shrink-0" />
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors tracking-widest">WhatsApp Online</a>
              </li>
            </ul>
          </div>

          {/* Social & CTA */}
          <div className="space-y-12">
            <h4 className="font-display font-black uppercase text-[11px] tracking-[0.4em] mb-10 text-white/20">Siga-nos</h4>
            <div className="flex items-center gap-8">
              <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-all hover:scale-125" aria-label="Instagram">
                <Instagram className="w-7 h-7" />
              </a>
              <a href={siteConfig.social.facebook.url} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-all hover:scale-125" aria-label="Facebook">
                <Facebook className="w-7 h-7" />
              </a>
            </div>
            
            <div className="pt-6">
              <div className="inline-block bg-white/5 px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-[10px] text-white/60 uppercase tracking-[0.3em] font-black mb-1">Horário</p>
                <p className="text-xs text-white font-bold whitespace-pre-line">{siteConfig.contact.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
            {siteConfig.footer.copyright}
          </p>
          <div className="flex items-center gap-8 text-[10px] text-white/20 uppercase tracking-[0.3em] font-black flex-wrap justify-center">
            <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link to="/termos" className="hover:text-white transition-colors">Termos</Link>
            <button 
              onClick={() => window.dispatchEvent(new Event('openCookiePreferences'))}
              className="hover:text-white transition-colors uppercase tracking-[0.3em] font-black"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
