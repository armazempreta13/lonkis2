import React, { useState } from 'react';
import { MessageCircle, Package } from 'lucide-react';
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

const ProductCardComponent: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no produto: ${product.name} (R$ ${product.price.toLocaleString('pt-BR')})`;
    window.open(`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col shadow-xl hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 border border-white/8 hover:border-white/15 group relative overflow-hidden">
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Image container */}
      <div className="relative w-full h-56 sm:h-64 mb-5 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-black/20 flex items-center justify-center group-hover:from-white/8 transition-all duration-500">
        {imageError ? (
          <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
            <Package size={40} className="text-white/20" />
            <span className="text-[10px] text-white/30 font-black uppercase text-center px-4">Imagem indisponível</span>
          </div>
        ) : (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain p-4 sm:p-5 transition-transform duration-700 group-hover:scale-105" 
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        {/* Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="bg-white/95 text-black text-[7px] sm:text-[8px] font-black px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-lg uppercase tracking-widest shadow-lg">
            {product.badge}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 gap-3 sm:gap-4">
        {/* Category */}
        <div>
          <span className="text-[8px] sm:text-[9px] font-black text-white/40 uppercase tracking-widest">
            {product.category}
          </span>
        </div>

        {/* Product name */}
        <h3 className="font-display text-base sm:text-lg font-black text-white uppercase tracking-tight leading-snug line-clamp-2">
          {product.name}
        </h3>
        
        {/* Colors */}
        {(product.colors ?? []).length > 0 && (
          <div className="flex items-center gap-2" aria-label="Cores disponíveis">
            {(product.colors ?? []).map((color, idx) => (
              <div 
                key={idx} 
                className="w-4 h-4 rounded-full border border-white/20 hover:border-white/40 shadow-md transition-all cursor-pointer hover:scale-110" 
                style={{ backgroundColor: color }} 
                title={`Cor: ${color}`}
                role="img"
                aria-label={`Cor disponível: ${color}`}
              />
            ))}
          </div>
        )}

        {/* Price and button */}
        <div className="mt-auto pt-4 sm:pt-5 border-t border-white/10 flex flex-col gap-4">
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-[8px] sm:text-[9px] font-black text-white/50 uppercase tracking-widest">Preço:</span>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
              <span className="text-sm font-bold text-white/60 mr-0.5">R$</span>
              {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Button */}
          <button 
            onClick={handleWhatsApp}
            aria-label={`Comprar ${product.name} pelo WhatsApp`}
            className="w-full bg-white text-black text-[9px] sm:text-[10px] font-black uppercase tracking-widest py-3 sm:py-3.5 px-4 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all active:scale-95 shadow-lg hover:shadow-emerald-500/30 border border-transparent hover:border-emerge-300"
          >
            <MessageCircle size={14} className="fill-current sm:w-4 sm:h-4" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductCard = React.memo(ProductCardComponent);
