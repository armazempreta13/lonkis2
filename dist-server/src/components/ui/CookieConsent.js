import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Shield, BarChart2, Megaphone, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
const DEFAULT_PREFS = {
    essential: true, // Always true
    analytics: false,
    marketing: false,
    preferences: false,
};
const STORAGE_KEY = 'lk_cookie_consent';
export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [prefs, setPrefs] = useState(DEFAULT_PREFS);
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            // Small delay so it doesn't pop up instantly on page load
            const timer = setTimeout(() => setShowBanner(true), 1500);
            return () => clearTimeout(timer);
        }
        else {
            try {
                setPrefs(JSON.parse(stored));
            }
            catch (e) {
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
    const savePreferences = (newPrefs) => {
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
    const togglePref = (key) => {
        if (key === 'essential')
            return; // Cannot toggle essential
        setPrefs(p => ({ ...p, [key]: !p[key] }));
    };
    return (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { children: showBanner && !showModal && (_jsx(motion.div, { initial: { y: 100, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 100, opacity: 0 }, transition: { type: 'spring', damping: 25, stiffness: 200 }, className: "fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none", children: _jsxs("div", { className: "max-w-5xl mx-auto bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-6 pointer-events-auto backdrop-blur-xl", children: [_jsxs("div", { className: "flex-1 flex gap-4 items-start", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-[#00e5a0]/10 flex items-center justify-center flex-shrink-0 mt-1", children: _jsx(Cookie, { className: "text-[#00e5a0]", size: 20 }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold text-lg mb-1", children: "Valorizamos sua privacidade" }), _jsxs("p", { className: "text-white/60 text-sm leading-relaxed", children: ["Utilizamos cookies essenciais para o funcionamento do site. Com o seu consentimento, tamb\u00E9m utilizamos cookies n\u00E3o essenciais para melhorar a sua experi\u00EAncia, analisar o tr\u00E1fego e para fins de marketing. Voc\u00EA pode alterar suas prefer\u00EAncias a qualquer momento. Leia nossa ", _jsx(Link, { to: "/privacidade", className: "text-[#00e5a0] hover:underline", children: "Pol\u00EDtica de Privacidade" }), "."] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0", children: [_jsx("button", { onClick: () => setShowModal(true), className: "px-5 py-2.5 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium", children: "Personalizar" }), _jsx("button", { onClick: rejectNonEssential, className: "px-5 py-2.5 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium", children: "Recusar" }), _jsx("button", { onClick: acceptAll, className: "px-5 py-2.5 rounded-xl bg-[#00e5a0] text-black hover:bg-[#00c88c] transition-colors text-sm font-bold", children: "Aceitar Todos" })] })] }) })) }), _jsx(AnimatePresence, { children: showModal && (_jsxs("div", { className: "fixed inset-0 z-[110] flex items-center justify-center p-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setShowModal(false), className: "absolute inset-0 bg-black/60 backdrop-blur-sm" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]", children: [_jsxs("div", { className: "p-6 border-b border-white/10 flex items-center justify-between bg-white/5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Settings2, { className: "text-[#00e5a0]", size: 24 }), _jsx("h2", { className: "text-xl font-bold text-white", children: "Prefer\u00EAncias de Cookies" })] }), _jsx("button", { onClick: () => setShowModal(false), className: "w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors", children: _jsx(X, { size: 18 }) })] }), _jsxs("div", { className: "p-6 overflow-y-auto flex-1 space-y-6", children: [_jsx("p", { className: "text-white/70 text-sm leading-relaxed", children: "Quando voc\u00EA visita qualquer site, ele pode armazenar ou recuperar informa\u00E7\u00F5es no seu navegador, principalmente na forma de cookies. Essas informa\u00E7\u00F5es podem ser sobre voc\u00EA, suas prefer\u00EAncias ou seu dispositivo e s\u00E3o usadas principalmente para fazer o site funcionar como voc\u00EA espera." }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 rounded-xl border border-white/10 bg-white/5 flex gap-4", children: [_jsx("div", { className: "mt-1", children: _jsx(Shield, { className: "text-white/40", size: 20 }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h4", { className: "text-white font-medium", children: "Cookies Estritamente Necess\u00E1rios" }), _jsx("span", { className: "text-[11px] uppercase tracking-wider font-bold text-[#00e5a0] bg-[#00e5a0]/10 px-2 py-1 rounded", children: "Sempre Ativo" })] }), _jsx("p", { className: "text-white/50 text-sm", children: "Estes cookies s\u00E3o necess\u00E1rios para que o website funcione e n\u00E3o podem ser desligados nos nossos sistemas. Normalmente, eles s\u00F3 s\u00E3o configurados em resposta a a\u00E7\u00F5es levadas a cabo por si e que correspondem a uma solicita\u00E7\u00E3o de servi\u00E7os, tais como definir as suas prefer\u00EAncias de privacidade, iniciar sess\u00E3o ou preencher formul\u00E1rios." })] })] }), _jsxs("div", { className: "p-4 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition-colors flex gap-4 cursor-pointer", onClick: () => togglePref('analytics'), children: [_jsx("div", { className: "mt-1", children: _jsx(BarChart2, { className: prefs.analytics ? "text-[#00e5a0]" : "text-white/40", size: 20 }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h4", { className: "text-white font-medium", children: "Cookies de Desempenho e An\u00E1lise" }), _jsx("div", { className: `w-10 h-5 rounded-full transition-colors relative ${prefs.analytics ? 'bg-[#00e5a0]' : 'bg-white/20'}`, children: _jsx("div", { className: `absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${prefs.analytics ? 'left-6' : 'left-1'}` }) })] }), _jsx("p", { className: "text-white/50 text-sm", children: "Estes cookies permitem-nos contar visitas e fontes de tr\u00E1fego, para que possamos medir e melhorar o desempenho do nosso website. Eles ajudam-nos a saber quais s\u00E3o as p\u00E1ginas mais e menos populares e a ver como os visitantes se movimentam pelo website." })] })] }), _jsxs("div", { className: "p-4 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition-colors flex gap-4 cursor-pointer", onClick: () => togglePref('marketing'), children: [_jsx("div", { className: "mt-1", children: _jsx(Megaphone, { className: prefs.marketing ? "text-[#00e5a0]" : "text-white/40", size: 20 }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h4", { className: "text-white font-medium", children: "Cookies de Publicidade" }), _jsx("div", { className: `w-10 h-5 rounded-full transition-colors relative ${prefs.marketing ? 'bg-[#00e5a0]' : 'bg-white/20'}`, children: _jsx("div", { className: `absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${prefs.marketing ? 'left-6' : 'left-1'}` }) })] }), _jsx("p", { className: "text-white/50 text-sm", children: "Estes cookies podem ser estabelecidos atrav\u00E9s do nosso site pelos nossos parceiros de publicidade. Podem ser usados por essas empresas para construir um perfil sobre os seus interesses e mostrar-lhe an\u00FAncios relevantes em outros websites." })] })] }), _jsxs("div", { className: "p-4 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 transition-colors flex gap-4 cursor-pointer", onClick: () => togglePref('preferences'), children: [_jsx("div", { className: "mt-1", children: _jsx(Settings2, { className: prefs.preferences ? "text-[#00e5a0]" : "text-white/40", size: 20 }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h4", { className: "text-white font-medium", children: "Cookies de Funcionalidade" }), _jsx("div", { className: `w-10 h-5 rounded-full transition-colors relative ${prefs.preferences ? 'bg-[#00e5a0]' : 'bg-white/20'}`, children: _jsx("div", { className: `absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${prefs.preferences ? 'left-6' : 'left-1'}` }) })] }), _jsx("p", { className: "text-white/50 text-sm", children: "Estes cookies permitem que o site forne\u00E7a uma funcionalidade e personaliza\u00E7\u00E3o melhoradas. Podem ser estabelecidos por n\u00F3s ou por fornecedores externos cujos servi\u00E7os adicion\u00E1mos \u00E0s nossas p\u00E1ginas." })] })] })] })] }), _jsxs("div", { className: "p-6 border-t border-white/10 bg-white/5 flex flex-col sm:flex-row justify-end gap-3", children: [_jsx("button", { onClick: rejectNonEssential, className: "px-6 py-3 rounded-xl border border-white/10 text-white/80 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium", children: "Recusar N\u00E3o Essenciais" }), _jsx("button", { onClick: saveCustom, className: "px-6 py-3 rounded-xl border border-[#00e5a0]/30 text-[#00e5a0] hover:bg-[#00e5a0]/10 transition-colors text-sm font-medium", children: "Salvar Prefer\u00EAncias" }), _jsx("button", { onClick: acceptAll, className: "px-6 py-3 rounded-xl bg-[#00e5a0] text-black hover:bg-[#00c88c] transition-colors text-sm font-bold", children: "Aceitar Todos" })] })] })] })) })] }));
}
