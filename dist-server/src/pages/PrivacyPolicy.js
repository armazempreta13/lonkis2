import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
export const PrivacyPolicy = () => {
    return (_jsxs("div", { className: "min-h-screen bg-black pt-40 pb-20 px-6 md:px-12 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 z-0 opacity-10", children: _jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" }) }), _jsxs("div", { className: "max-w-4xl mx-auto relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-16 text-center", children: [_jsx("span", { className: "text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block mb-4", children: "Seguran\u00E7a & Transpar\u00EAncia" }), _jsxs("h1", { className: "font-display text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8", children: ["Pol\u00EDtica de ", _jsx("br", {}), _jsx("span", { className: "text-white/20", children: "Privacidade" })] }), _jsx("p", { className: "text-white/40 text-sm font-medium max-w-2xl mx-auto leading-relaxed", children: "Na LK Imports, a sua privacidade \u00E9 nossa prioridade. Este documento detalha como tratamos seus dados com o m\u00E1ximo rigor e seguran\u00E7a." })] }), _jsxs("div", { className: "space-y-12", children: [[
                                {
                                    icon: Shield,
                                    title: "Coleta de Informações",
                                    content: "Coletamos apenas as informações estritamente necessárias para a prestação de nossos serviços de assistência técnica e venda de produtos, como nome, contato e detalhes do dispositivo."
                                },
                                {
                                    icon: Lock,
                                    title: "Segurança dos Dados",
                                    content: "Implementamos medidas de segurança de nível industrial para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição."
                                },
                                {
                                    icon: Eye,
                                    title: "Uso das Informações",
                                    content: "Seus dados são utilizados exclusivamente para processar pedidos, fornecer suporte técnico, enviar atualizações sobre reparos e, caso autorizado, comunicações de marketing."
                                },
                                {
                                    icon: FileText,
                                    title: "Cookies e Rastreamento",
                                    content: "Utilizamos cookies para melhorar a sua experiência em nosso site, analisar o tráfego e personalizar conteúdo. Você pode gerenciar suas preferências de cookies a qualquer momento clicando no botão abaixo.",
                                    action: (_jsx("button", { onClick: () => window.dispatchEvent(new Event('openCookiePreferences')), className: "mt-4 px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-bold uppercase tracking-wider", children: "Gerenciar Cookies" }))
                                },
                                {
                                    icon: FileText,
                                    title: "Seus Direitos",
                                    content: "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Basta entrar em contato com nossa equipe de suporte."
                                }
                            ].map((item, index) => (_jsx(motion.section, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "bg-zinc-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10", children: _jsx(item.icon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "font-display text-2xl font-black text-white uppercase tracking-tight mb-4", children: item.title }), _jsx("p", { className: "text-white/40 text-sm leading-relaxed font-medium", children: item.content }), item.action && item.action] })] }) }, item.title))), _jsx(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, className: "pt-12 border-t border-white/5 text-center", children: _jsx("p", { className: "text-[10px] text-white/20 uppercase tracking-[0.3em] font-black", children: "\u00DAltima atualiza\u00E7\u00E3o: 21 de Mar\u00E7o de 2024" }) })] })] })] }));
};
