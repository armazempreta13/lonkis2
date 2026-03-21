import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'motion/react';
import { Gavel, CheckCircle, AlertCircle, Clock } from 'lucide-react';
export const TermsOfService = () => {
    return (_jsxs("div", { className: "min-h-screen bg-black pt-40 pb-20 px-6 md:px-12 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 z-0 opacity-10", children: _jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" }) }), _jsxs("div", { className: "max-w-4xl mx-auto relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-16 text-center", children: [_jsx("span", { className: "text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block mb-4", children: "Regras & Compromissos" }), _jsxs("h1", { className: "font-display text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8", children: ["Termos de ", _jsx("br", {}), _jsx("span", { className: "text-white/20", children: "Servi\u00E7o" })] }), _jsx("p", { className: "text-white/40 text-sm font-medium max-w-2xl mx-auto leading-relaxed", children: "Ao utilizar os servi\u00E7os da LK Imports, voc\u00EA concorda com os termos e condi\u00E7\u00F5es descritos abaixo." })] }), _jsxs("div", { className: "space-y-12", children: [[
                                {
                                    icon: Gavel,
                                    title: "Uso dos Serviços",
                                    content: "Nossos serviços de assistência técnica são prestados com base na descrição do problema fornecida pelo cliente e no diagnóstico técnico realizado por nossa equipe."
                                },
                                {
                                    icon: CheckCircle,
                                    title: "Garantia de Reparo",
                                    content: "Oferecemos garantia de 90 dias para todos os reparos realizados, cobrindo defeitos de fabricação das peças substituídas e falhas na mão de obra."
                                },
                                {
                                    icon: AlertCircle,
                                    title: "Responsabilidade",
                                    content: "A LK Imports não se responsabiliza por perda de dados durante o processo de reparo. Recomendamos fortemente a realização de backup antes de entregar o aparelho."
                                },
                                {
                                    icon: Clock,
                                    title: "Prazos e Retirada",
                                    content: "Os prazos de reparo são estimativas e podem variar conforme a complexidade do problema. Aparelhos não retirados em até 90 dias após o aviso de conclusão serão descartados ou leiloados para cobrir custos."
                                }
                            ].map((item, index) => (_jsx(motion.section, { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { delay: index * 0.1 }, className: "bg-zinc-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/5", children: _jsxs("div", { className: "flex items-start gap-6", children: [_jsx("div", { className: "w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10", children: _jsx(item.icon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "font-display text-2xl font-black text-white uppercase tracking-tight mb-4", children: item.title }), _jsx("p", { className: "text-white/40 text-sm leading-relaxed font-medium", children: item.content })] })] }) }, item.title))), _jsx(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, className: "pt-12 border-t border-white/5 text-center", children: _jsx("p", { className: "text-[10px] text-white/20 uppercase tracking-[0.3em] font-black", children: "\u00DAltima atualiza\u00E7\u00E3o: 21 de Mar\u00E7o de 2024" }) })] })] })] }));
};
