import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../siteConfig';

export const Footer = () => {
  return (
    <>
      <style>{`
        .footer-logo { height: ${siteConfig.brand.logoSize?.footer?.desktop ?? siteConfig.brand.logoSize.desktop}px; }
        @media (max-width: 768px) {
          .footer-logo { height: ${siteConfig.brand.logoSize?.footer?.mobile ?? siteConfig.brand.logoSize.mobile}px; }
        }
      `}</style>
      <footer className="bg-black text-white pt-0 pb-16 border-t border-white/5 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Google Maps Integration - Now at the Very Top of Footer */}
      <div className="w-full h-[200px] sm:h-[250px] md:h-[320px] lg:h-[400px] overflow-hidden border-b border-white/5 relative group">
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
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-1rem)] sm:w-auto">
          <a 
            href={siteConfig.contact.mapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 rounded-lg sm:rounded-xl md:rounded-2xl text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center justify-center gap-2 shadow-2xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 whitespace-nowrap min-h-[44px]"
          >
            <MapPin size={14} className="sm:size-16" />
            Abrir no Google Maps
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 sm:pt-20 md:pt-24 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 md:gap-10 lg:gap-16 mb-6 sm:mb-16 md:mb-20 lg:mb-24">
          {/* Brand Info */}
          <div className="space-y-2 sm:space-y-6 md:space-y-8 text-center sm:text-left">
            <Link to="/" className="inline-block group transition-transform duration-500 hover:scale-105" aria-label="Ir para a página inicial">
              <img 
                src={siteConfig.brand.logo} 
                alt={`${siteConfig.brand.name} Logo`} 
                className="w-auto object-contain brightness-0 invert group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all mx-auto sm:mx-0 footer-logo"
                style={{ height: `${siteConfig.brand.logoSize?.footer?.desktop ?? siteConfig.brand.logoSize.desktop}px` }}
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-white/30 text-[11px] sm:text-xs md:text-sm font-medium leading-relaxed max-w-xs mx-auto sm:mx-0">
              {siteConfig.footer.description}
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-display font-black uppercase text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-6 md:mb-10 text-white/20">{siteConfig.footer.quickLinksTitle}</h4>
            <ul className="space-y-1.5 sm:space-y-4 md:space-y-5 text-[10px] sm:text-xs md:text-sm text-white/40 font-bold uppercase tracking-widest">
              {siteConfig.navbar.navItems.map((item) => (
                <li key={item.label}><Link to={item.href} className="hover:text-white transition-all hover:translate-x-2 inline-block min-h-[44px] flex items-center">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-display font-black uppercase text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-6 md:mb-10 text-white/20">{siteConfig.footer.contactTitle}</h4>
            <ul className="space-y-2 sm:space-y-5 md:space-y-6 lg:space-y-8 text-[10px] sm:text-xs md:text-sm text-white/40 font-bold">
              <li className="flex items-start gap-3 sm:gap-4 group min-h-[44px]">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/20 group-hover:text-white transition-colors shrink-0 mt-1" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 group min-h-[44px]">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white/20 group-hover:text-white transition-colors shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="group-hover:text-white transition-colors tracking-widest">{siteConfig.contact.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 group min-h-[44px]">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white/20 group-hover:text-white transition-colors shrink-0" />
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors tracking-widest">WhatsApp Online</a>
              </li>
            </ul>
          </div>

          {/* Social & CTA */}
          <div className="space-y-2 sm:space-y-8 md:space-y-10 lg:space-y-12">
            <h4 className="font-display font-black uppercase text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] mb-2 sm:mb-6 md:mb-10 text-white/20">Siga-nos</h4>
            <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8">
              <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-all hover:scale-125 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Instagram">
                <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
              <a href={siteConfig.social.facebook.url} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-all hover:scale-125 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Facebook">
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            </div>
            
            <div className="pt-2 sm:pt-6">
              <div className="inline-block bg-white/5 px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-[9px] sm:text-[10px] text-white/60 uppercase tracking-[0.3em] font-black mb-1.5 sm:mb-2">Horário</p>
                <p className="text-[10px] sm:text-xs text-white font-bold whitespace-pre-line leading-relaxed">
                  {`Segunda a Sexta: ${siteConfig.contact.hours.mondayToFriday}\nSábado: ${siteConfig.contact.hours.saturday}\nDomingo: ${siteConfig.contact.hours.sunday}\nFeriados: ${siteConfig.contact.hours.holiday}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-16 md:pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-8">
          <p className="text-[9px] sm:text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
            {siteConfig.footer.copyright}
          </p>
          <div className="flex items-center gap-6 sm:gap-8 text-[9px] sm:text-[10px] text-white/20 uppercase tracking-[0.3em] font-black flex-wrap justify-center">
            <Link to="/privacidade" className="hover:text-white transition-colors min-h-[44px] flex items-center">Privacidade</Link>
            <Link to="/termos" className="hover:text-white transition-colors min-h-[44px] flex items-center">Termos</Link>
            <button 
              onClick={() => window.dispatchEvent(new Event('openCookiePreferences'))}
              className="hover:text-white transition-colors uppercase tracking-[0.3em] font-black min-h-[44px] flex items-center"
            >
              Cookies
            </button>
          </div>
        </div>

        <div className="pt-8 sm:pt-12 text-center border-t border-white/10">
          <p className="text-[8px] sm:text-[9px] text-white/30 uppercase tracking-[0.3em] font-medium">
            {siteConfig.footer.credit?.text}{' '}
            <a 
              href={siteConfig.footer.credit?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors font-black underline decoration-dotted underline-offset-2"
            >
              {siteConfig.footer.credit?.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};
