import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check, Shield, BarChart2, Megaphone, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type CookiePreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const DEFAULT_PREFS: CookiePreferences = {
  essential: true, // Always true
  analytics: false,
  marketing: false,
  preferences: false,
};

const STORAGE_KEY = 'lk_cookie_consent';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Small delay so it doesn't pop up instantly on page load
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        setPrefs(JSON.parse(stored));
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleOpenPreferences = () => {
      setShowModal(true);
    };
    
    window.addEventListener('openCookiePreferences', handleOpenPreferences);
    return () => window.removeEventListener('openCookiePreferences', handleOpenPreferences);
  }, []);

  const savePreferences = (newPrefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    setPrefs(newPrefs);
    setShowBanner(false);
    setShowModal(false);
    
    // Here you would typically trigger your analytics/marketing scripts based on newPrefs
    // e.g., if (newPrefs.analytics) { loadGoogleAnalytics(); }
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const rejectNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const saveCustom = () => {
    savePreferences(prefs);
  };

  const togglePref = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Cannot toggle essential
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto backdrop-blur-xl">
              
              <div className="flex-1 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#00e5a0]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Cookie className="text-[#00e5a0]" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Valorizamos sua privacidade</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Utilizamos cookies essenciais para o funcionamento do site. Com o seu consentimento, também utilizamos cookies não essenciais para melhorar a sua experiência, analisar o tráfego e para fins de marketing. Você pode alterar suas preferências a qualquer momento. Leia nossa <Link to="/privacidade" className="text-[#00e5a0] hover:underline">Política de Privacidade</Link>.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                >
                  Personalizar
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                >
                  Recusar
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 rounded-xl bg-[#00e5a0] text-black hover:bg-[#00c88c] transition-colors text-sm font-bold"
                >
                  Aceitar Todos
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <Settings2 className="text-[#00e5a0]" size={24} />
                  <h2 className="text-xl font-bold text-white">Preferências de Cookies</h2>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <p className="text-white/70 text-sm leading-relaxed">
                  Quando você visita qualquer site, ele pode armazenar ou recuperar informações no seu navegador, principalmente na forma de cookies. Essas informações podem ser sobre você, suas preferências ou seu dispositivo e são usadas principalmente para fazer o site funcionar como você espera.
                </p>

                <div className="space-y-4">
                  {/* Essential */}
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex gap-4">
                    <div className="mt-1"><Shield className="text-white/40" size={20} /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">Cookies Estritamente Necessários</h4>
                        <span className="text-[11px] uppercase tracking-wider font-bold text-[#00e5a0] bg-[#00e5a0]/10 px-2 py-1 rounded">Sempre Ativo</span>
                      </div>
                      <p className="text-white/50 text-sm">
                        Estes cookies são necessários para que o website funcione e não podem ser desligados nos nossos sistemas. Normalmente, eles só são configurados em resposta a ações levadas a cabo por si e que correspondem a uma solicitação de serviços, tais como definir as suas preferências de privacidade, iniciar sessão ou preencher formulários.
                      </p>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div 
                    className="p-4 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition-colors flex gap-4 cursor-pointer"
                    onClick={() => togglePref('analytics')}
                  >
                    <div className="mt-1"><BarChart2 className={prefs.analytics ? "text-[#00e5a0]" : "text-white/40"} size={20} /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">Cookies de Desempenho e Análise</h4>
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${prefs.analytics ? 'bg-[#00e5a0]' : 'bg-white/20'}`}>
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${prefs.analytics ? 'left-6' : 'left-1'}`} />
                        </div>
                      </div>
                      <p className="text-white/50 text-sm">
                        Estes cookies permitem-nos contar visitas e fontes de tráfego, para que possamos medir e melhorar o desempenho do nosso website. Eles ajudam-nos a saber quais são as páginas mais e menos populares e a ver como os visitantes se movimentam pelo website.
                      </p>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div 
                    className="p-4 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition-colors flex gap-4 cursor-pointer"
                    onClick={() => togglePref('marketing')}
                  >
                    <div className="mt-1"><Megaphone className={prefs.marketing ? "text-[#00e5a0]" : "text-white/40"} size={20} /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">Cookies de Publicidade</h4>
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${prefs.marketing ? 'bg-[#00e5a0]' : 'bg-white/20'}`}>
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${prefs.marketing ? 'left-6' : 'left-1'}`} />
                        </div>
                      </div>
                      <p className="text-white/50 text-sm">
                        Estes cookies podem ser estabelecidos através do nosso site pelos nossos parceiros de publicidade. Podem ser usados por essas empresas para construir um perfil sobre os seus interesses e mostrar-lhe anúncios relevantes em outros websites.
                      </p>
                    </div>
                  </div>
                  
                  {/* Preferences */}
                  <div 
                    className="p-4 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition-colors flex gap-4 cursor-pointer"
                    onClick={() => togglePref('preferences')}
                  >
                    <div className="mt-1"><Settings2 className={prefs.preferences ? "text-[#00e5a0]" : "text-white/40"} size={20} /></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">Cookies de Funcionalidade</h4>
                        <div className={`w-10 h-5 rounded-full transition-colors relative ${prefs.preferences ? 'bg-[#00e5a0]' : 'bg-white/20'}`}>
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${prefs.preferences ? 'left-6' : 'left-1'}`} />
                        </div>
                      </div>
                      <p className="text-white/50 text-sm">
                        Estes cookies permitem que o site forneça uma funcionalidade e personalização melhoradas. Podem ser estabelecidos por nós ou por fornecedores externos cujos serviços adicionámos às nossas páginas.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={rejectNonEssential}
                  className="px-6 py-3 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                >
                  Recusar Não Essenciais
                </button>
                <button
                  onClick={saveCustom}
                  className="px-6 py-3 rounded-xl border border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/10 transition-colors text-sm font-medium"
                >
                  Salvar Preferências
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-3 rounded-xl bg-[#00e5a0] text-black hover:bg-[#00c88c] transition-colors text-sm font-bold"
                >
                  Aceitar Todos
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
