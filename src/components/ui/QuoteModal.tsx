import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Smartphone, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { WHATSAPP_LINK } from '../../constants';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  price?: string;
}

export const QuoteModal = ({ isOpen, onClose, serviceName, price = "Sob orçamento" }: QuoteModalProps) => {
  const [formData, setFormData] = useState({ name: '', model: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá! Gostaria de um orçamento para ${serviceName} (${price}).\n\n*Dados do Cliente:*\n👤 Nome: ${formData.name}\n📱 Modelo: ${formData.model}\n📞 WhatsApp: ${formData.phone}`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-zinc-900 border border-white/10 w-full max-w-lg rounded-[3.5rem] p-6 sm:p-8 md:p-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-white/20 hover:text-white transition-all hover:rotate-90 duration-300"
              aria-label="Fechar modal"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="mb-12">
              <div className="inline-block px-4 py-1 bg-white/5 rounded-full mb-6 border border-white/10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Orçamento Personalizado</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tighter mb-4 leading-none">
                {serviceName}
              </h2>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-white/40 text-sm font-black uppercase tracking-widest">{price}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black ml-2">Nome Completo</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-white transition-colors" />
                  <input 
                    required
                    placeholder="Como podemos te chamar?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-white/10 focus:border-white focus:bg-white/10 outline-none transition-all font-medium"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black ml-2">Modelo do Aparelho</label>
                <div className="relative group">
                  <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-white transition-colors" />
                  <input 
                    required
                    placeholder="Ex: iPhone 15 Pro Max"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-white/10 focus:border-white focus:bg-white/10 outline-none transition-all font-medium"
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black ml-2">Seu WhatsApp</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-focus-within:text-white transition-colors" />
                  <input 
                    required
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-white/10 focus:border-white focus:bg-white/10 outline-none transition-all font-medium"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-6 rounded-2xl hover:bg-zinc-200 transition-all duration-500 flex items-center justify-center gap-4 shadow-2xl shadow-white/5 mt-8 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                <span className="text-[11px]">Enviar via WhatsApp</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
