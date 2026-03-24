import { motion } from 'motion/react';
import { Gavel, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <span className="text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block mb-4">Regras & Compromissos</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-8">
            Termos de <br />
            <span className="text-white/20">Serviço</span>
          </h1>
          <p className="text-white/40 text-sm font-medium max-w-2xl mx-auto leading-relaxed">
            Ao utilizar os serviços da LK Imports, você concorda com os termos e condições descritos abaixo.
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
          {[
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
