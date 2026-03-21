import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../siteConfig';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  colors?: string[];
  badge: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no produto: ${product.name} (R$ ${product.price.toLocaleString('pt-BR')})`;
    window.open(`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 flex flex-col shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 border border-white/5 hover:border-white/20 group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
      </div>

      <div className="relative w-full h-64 sm:h-72 mb-6 sm:mb-8 overflow-hidden rounded-[1.5rem] sm:rounded-3xl bg-white/5 flex items-center justify-center group-hover:bg-white transition-all duration-700">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-6 sm:p-8 transition-transform duration-1000 group-hover:scale-110 group-hover:brightness-100 brightness-90" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2">
          <span className="bg-white text-black text-[8px] sm:text-[9px] font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl">
            {product.badge}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <span className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 sm:mb-3 group-hover:text-white/40 transition-colors">{product.category}</span>
        <h3 className="font-display text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4 leading-tight tracking-tight uppercase group-hover:text-white transition-colors">{product.name}</h3>
        
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8" aria-label="Cores disponíveis">
          {product.colors.map((color, idx) => (
            <div 
              key={idx} 
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/10 shadow-2xl ring-2 ring-transparent hover:ring-white/30 transition-all cursor-help" 
              style={{ backgroundColor: color }} 
              title={`Cor: ${color}`}
            >
              <span className="sr-only">{color}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 sm:pt-8 border-t border-white/5 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col min-w-0">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/20 font-black mb-1">Preço</span>
            <span className="text-lg sm:text-2xl font-black text-white tracking-tighter truncate">
              <span className="text-xs sm:text-sm font-bold mr-1 text-white/40">R$</span>
              {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <button 
            onClick={handleWhatsApp}
            aria-label={`Comprar ${product.name} pelo WhatsApp`}
            className="bg-white text-black text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] py-3.5 sm:py-4 px-4 sm:px-8 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all active:scale-95 shadow-2xl shadow-white/5 hover:shadow-emerald-500/20 flex-shrink-0 whitespace-nowrap border border-transparent hover:border-emerald-400/50"
          >
            <MessageCircle size={16} className="fill-current sm:w-[18px] sm:h-[18px]" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
