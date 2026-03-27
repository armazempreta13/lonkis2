import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <span className="text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block mb-4">Segurança & Transparência</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            Política de <br />
            <span className="text-white/20">Privacidade</span>
          </h1>
          <p className="text-white/40 text-sm font-medium max-w-2xl mx-auto leading-relaxed">
            Na LK Imports, a sua privacidade é nossa prioridade. Este documento detalha como tratamos seus dados com o máximo rigor e segurança.
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
          {[
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
              action: (
                <button 
                  onClick={() => window.dispatchEvent(new Event('openCookiePreferences'))}
                  className="mt-4 px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors text-xs sm:text-sm font-bold uppercase tracking-wider"
                >
                  Gerenciar Cookies
                </button>
              )
            },
            {
              icon: FileText,
              title: "Seus Direitos",
              content: "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Basta entrar em contato com nossa equipe de suporte."
            }
          ].map((item, index) => (
            <motion.section
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] border border-white/5"
            >
              <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
                <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                  <item.icon className="w-5 md:w-6 h-5 md:h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4">{item.title}</h2>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed font-medium">{item.content}</p>
                  {item.action && item.action}
                </div>
              </div>
            </motion.section>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-6 sm:pt-8 md:pt-12 border-t border-white/5 text-center"
          >
            <p className="text-[7px] sm:text-[8px] md:text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
              Última atualização: 21 de Março de 2024
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
