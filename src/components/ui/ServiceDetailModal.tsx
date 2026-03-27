import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    details: string[];
    warranty?: string;
    timeline?: string;
  };
}

export const ServiceDetailModal = ({ isOpen, onClose, service }: ServiceDetailModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-0"
          >
            <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="relative bg-gradient-to-br from-white/5 to-transparent p-8 sm:p-12 border-b border-white/5">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white/60 hover:text-white" />
                </button>

                <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight pr-12">
                  {service.title}
                </h2>
                <p className="text-white/40 text-sm sm:text-base mt-4 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-12 space-y-8">
                {/* Details */}
                {service.details.length > 0 && (
                  <div>
                    <h3 className="text-white/60 text-[10px] uppercase tracking-[0.3em] font-black mb-6">
                      O que está incluído
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {service.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3 sm:gap-4"
                        >
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-white/70 text-sm sm:text-base leading-relaxed">
                            {detail}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warranty & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {service.warranty && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-black mb-3">
                        Garantia
                      </p>
                      <p className="text-white text-lg sm:text-xl font-black">
                        {service.warranty}
                      </p>
                    </div>
                  )}
                  {service.timeline && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-black mb-3">
                        Prazo
                      </p>
                      <p className="text-white text-lg sm:text-xl font-black">
                        {service.timeline}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-white/5 border-t border-white/5 p-6 sm:p-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onClose}
                  className="w-full sm:flex-1 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all"
                >
                  Voltar
                </button>
                <button
                  onClick={() => {
                    onClose();
                    // Você pode adicionar lógica para abrir o modal de orçamento aqui
                  }}
                  className="w-full sm:flex-1 px-8 py-4 bg-white text-black hover:bg-white/90 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all"
                >
                  Solicitar Orçamento
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
