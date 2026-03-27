import { Link } from 'react-router-dom';
import { 
  Instagram, Facebook, Phone, MapPin, MessageCircle, Clock, 
  Smartphone, Battery, Apple, Zap, MessageSquare, ExternalLink
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../siteConfig';

export const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeUntilChange, setTimeUntilChange] = useState('');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate if open and time until next change
  const getStatusInfo = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Horários: Segunda a Sábado 08:00 - 19:30, Domingo 08:00 - 15:00
    const openTime = 8 * 60; // 08:00
    const closeSatDay = 19 * 60 + 30; // 19:30 (seg-sex, sab)
    const closeSunday = 15 * 60; // 15:00 (domingo)

    let isOpen = false;
    let nextChangeTime = '';
    let nextChangeIn = '';

    if (day === 0) { // Domingo
      if (totalMinutes < openTime && totalMinutes < closeSunday) {
        // Ainda não abriu
        const minutesUntilOpen = openTime - totalMinutes;
        nextChangeTime = 'Abre em ' + Math.floor(minutesUntilOpen / 60) + 'h ' + (minutesUntilOpen % 60) + 'm';
        nextChangeIn = nextChangeTime;
      } else if (totalMinutes < closeSunday) {
        // Aberto no domingo
        isOpen = true;
        const minutesUntilClose = closeSunday - totalMinutes;
        nextChangeTime = 'Fecha em ' + Math.floor(minutesUntilClose / 60) + 'h ' + (minutesUntilClose % 60) + 'm';
        nextChangeIn = nextChangeTime;
      } else {
        // Fechado, abre amanhã
        const minutesUntilMondayOpen = (24 * 60 - totalMinutes) + openTime;
        nextChangeTime = 'Abre amanhã em ' + Math.floor(minutesUntilMondayOpen / 60) + 'h';
      }
    } else {
      // Segunda a Sábado
      const closeTime = day === 6 ? closeSatDay : closeSatDay; // Sábado: 19:30
      
      if (totalMinutes < openTime) {
        // Ainda não abriu
        const minutesUntilOpen = openTime - totalMinutes;
        nextChangeTime = 'Abre em ' + Math.floor(minutesUntilOpen / 60) + 'h ' + (minutesUntilOpen % 60) + 'm';
      } else if (totalMinutes < closeTime) {
        // Aberto
        isOpen = true;
        const minutesUntilClose = closeTime - totalMinutes;
        nextChangeTime = 'Fecha em ' + Math.floor(minutesUntilClose / 60) + 'h ' + (minutesUntilClose % 60) + 'm';
      } else {
        // Fechado
        const minutesTomorrow = (24 * 60 - totalMinutes) + openTime;
        nextChangeTime = 'Abre amanhã em ' + Math.floor(minutesTomorrow / 60) + 'h';
      }
    }

    return { isOpen, nextChangeTime };
  };

  const { isOpen, nextChangeTime } = getStatusInfo();

  // Services with icons
  const quickServices = [
    { label: 'Troca de Tela', icon: Smartphone, href: '/servicos' },
    { label: 'Troca de Bateria', icon: Battery, href: '/servicos' },
    { label: 'Conserto iPhone', icon: Apple, href: '/servicos' },
    { label: 'Diagnóstico Rápido', icon: Zap, href: '/servicos' },
    { label: 'Orçamento Rápido', icon: MessageSquare, href: '#chatbot' },
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <>
      <style>{`
        .footer-logo { height: ${siteConfig.brand.logoSize?.footer?.desktop ?? siteConfig.brand.logoSize.desktop}px; }
        @media (max-width: 768px) {
          .footer-logo { height: ${siteConfig.brand.logoSize?.footer?.mobile ?? siteConfig.brand.logoSize.mobile}px; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        }
        .live-pulse { animation: pulse-glow 2s infinite; }
      `}</style>
      <footer className="bg-black text-white border-t border-white/5 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 relative z-10">
          
          {/* Main Content Grid - More Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6 lg:gap-8 mb-8 md:mb-12">

            {/* 1. Brand + Description */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block group transition-transform duration-500 hover:scale-105 mb-4" aria-label="Ir para a página inicial">
                <img 
                  src={siteConfig.brand.logo} 
                  alt={`${siteConfig.brand.name} Logo`} 
                  className="w-auto object-contain brightness-0 invert group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all footer-logo h-12"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <p className="text-white/50 text-xs font-medium leading-relaxed line-clamp-3">
                Assistência técnica especializada em reparos de celulares em Samambaia, DF. Trocas de tela, bateria, diagnóstico gratuito.
              </p>
            </div>

            {/* 2. Quick Services - Strategic Links with Icons */}
            <div className="lg:col-span-1">
              <h4 className="font-display font-black uppercase text-[9px] tracking-[0.3em] mb-3 text-white/40">Serviços</h4>
              <ul className="space-y-2 text-[10px] font-bold text-white/50">
                {quickServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <li key={service.label}>
                      <Link 
                        to={service.href} 
                        className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-2 min-h-[32px] group"
                      >
                        <IconComponent className="w-3.5 h-3.5 text-white/40 group-hover:text-emerald-500 transition-colors" />
                        {service.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* 3. Main Contact Info - Now with Action */}
            <div className="lg:col-span-1">
              <h4 className="font-display font-black uppercase text-[9px] tracking-[0.3em] mb-3 text-white/40">Contato</h4>
              <div className="space-y-3">
                {/* Location - Clickable */}
                <a 
                  href={siteConfig.contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 group hover:text-white transition-colors min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-white/60 group-hover:text-white font-bold leading-snug">
                      {siteConfig.contact.address}
                    </p>
                    <p className="text-[9px] text-emerald-500 font-black flex items-center gap-1">
                      Ver mapa
                      <ExternalLink className="w-2.5 h-2.5" />
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a 
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 group hover:text-white transition-colors min-h-[32px]"
                >
                  <Phone className="w-4 h-4 text-white/40 group-hover:text-white shrink-0" />
                  <span className="text-[11px] text-white/60 group-hover:text-white font-bold tracking-widest">
                    {siteConfig.contact.phoneDisplay}
                  </span>
                </a>
              </div>
            </div>

            {/* 4. Live Hours - REAL-TIME & ORIGINAL */}
            <div className="lg:col-span-1">
              <h4 className="font-display font-black uppercase text-[9px] tracking-[0.3em] mb-3 text-white/40 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Horário
              </h4>
              <div className="space-y-3">
                {/* Schedule */}
                <div className="space-y-1 text-[10px] text-white/60 font-bold leading-tight">
                  <p>Segunda - Sexta: 08:00 - 19:30</p>
                  <p>Sábado: 08:00 - 19:30</p>
                  <p>Domingo: 08:00 - 15:00</p>
                </div>

                {/* Status Badge - Simple & Clean */}
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${isOpen ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}>
                  <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-red-400'} ${isOpen ? 'animate-pulse' : ''}`}></div>
                  {isOpen ? 'Aberto Agora' : 'Fechado'}
                </div>
              </div>
            </div>

            {/* 5. WhatsApp CTA + Social - PROMINENT */}
            <div className="lg:col-span-1">
              <div className="space-y-3">
                {/* WhatsApp Button - Green & Prominent */}
                <a 
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black px-4 py-3 rounded-lg transition-all hover:scale-105 active:scale-95 min-h-[44px] text-[11px] uppercase tracking-[0.2em] shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Agora
                </a>

                {/* Social Icons - Larger */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <a 
                    href={siteConfig.social.instagram.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/40 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center" 
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href={siteConfig.social.facebook.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/40 hover:text-white hover:bg-white/10 p-3 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center" 
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>

                <p className="text-[8px] text-white/30 text-center pt-1 uppercase tracking-[0.2em]">
                  Siga para promoções
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 my-6 md:my-8"></div>

          {/* Bottom Section - Legal & SEO & Developer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-white/40 uppercase tracking-[0.2em]">
            <p className="font-black">
              © 2025 {siteConfig.brand.name} - Reparos de Celular em Samambaia, DF
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link to="/privacidade" className="hover:text-white transition-colors font-bold">Privacidade</Link>
              <Link to="/termos" className="hover:text-white transition-colors font-bold">Termos</Link>
              <button 
                onClick={() => window.dispatchEvent(new Event('openCookiePreferences'))}
                className="hover:text-white transition-colors font-bold"
              >
                Cookies
              </button>
              <span className="text-white/20">•</span>
              <a 
                href="https://phstatic.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors font-bold flex items-center gap-1"
              >
                Dev: phstatic.com.br
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
