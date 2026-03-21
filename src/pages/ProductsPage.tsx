import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ui/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../siteConfig';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [maxPrice, setMaxPrice] = useState(10000);

  const products = siteConfig.productsPage.items;
  const categories = siteConfig.productsPage.categories;
  const maxProductPrice = Math.max(...products.map(p => p.price));

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'Todos' || p.category === selectedCategory) &&
      p.price <= maxPrice
    );

    if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, maxPrice]);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      <SEO 
        title={`Produtos | ${siteConfig.brand.name}`}
        description="Confira nossa seleção de acessórios premium, carregadores, cabos e smartphones com garantia."
      />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-zinc-900/40 backdrop-blur-md p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/5 shadow-2xl lg:sticky lg:top-32">
              <h2 className="font-display text-xl sm:text-2xl font-black mb-8 sm:mb-10 flex items-center gap-3 tracking-tight text-white uppercase">
                <SlidersHorizontal size={20} className="text-white/20 sm:w-6 sm:h-6" /> Filtros
              </h2>
              
              <div className="mb-10 sm:mb-12">
                <label htmlFor="search" className="block text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Busca</label>
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                  <input 
                    id="search"
                    type="text" 
                    placeholder="O QUE VOCÊ PROCURA?" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 sm:py-5 pl-14 pr-6 text-[10px] sm:text-xs text-white focus:outline-none focus:border-white/40 transition-all font-medium placeholder:text-white/10"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-10 sm:mb-12">
                <label className="block text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-6">Categorias</label>
                <div className="flex flex-wrap lg:flex-col gap-3 sm:gap-4">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 sm:gap-4 cursor-pointer group bg-white/5 lg:bg-transparent px-4 py-2 lg:p-0 rounded-full lg:rounded-none">
                      <div className="relative flex items-center justify-center">
                        <input 
                           type="radio" 
                           name="category" 
                           checked={selectedCategory === cat} 
                           onChange={() => setSelectedCategory(cat)}
                           className="peer appearance-none w-4 h-4 sm:w-5 sm:h-5 border border-white/10 rounded-full checked:border-white transition-all"
                        />
                        <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                      </div>
                      <span className={`text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors ${selectedCategory === cat ? 'text-white' : 'text-white/20 group-hover:text-white/60'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <label htmlFor="price-range" className="block text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Preço Máximo</label>
                  <span className="text-[10px] sm:text-xs font-black text-white">R$ {maxPrice.toLocaleString('pt-BR')}</span>
                </div>
                <input 
                  id="price-range"
                  type="range" 
                  min="0" 
                  max={maxProductPrice} 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between mt-4">
                  <span className="text-[9px] sm:text-[10px] font-black text-white/10">R$ 0</span>
                  <span className="text-[9px] sm:text-[10px] font-black text-white/10">R$ {maxProductPrice.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-white/40 font-black block"
                >
                  Catálogo Premium
                </motion.span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85]">
                  Nossos <br />
                  <span className="text-white/20">Produtos</span>
                </h1>
                <p className="text-white/40 text-[9px] sm:text-xs font-black uppercase tracking-widest">Exibindo {filteredProducts.length} itens encontrados</p>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px] sm:min-w-[240px]">
                <label htmlFor="sort" className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-1">Ordenar por</label>
                <div className="relative">
                  <select 
                    id="sort"
                    className="w-full bg-zinc-900/40 border border-white/10 rounded-2xl py-4 sm:py-5 px-6 text-[10px] sm:text-xs font-black text-white focus:outline-none focus:border-white/40 transition-all cursor-pointer appearance-none uppercase tracking-widest" 
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name" className="bg-zinc-900">Nome (A-Z)</option>
                    <option value="price-asc" className="bg-zinc-900">Menor Preço</option>
                    <option value="price-desc" className="bg-zinc-900">Maior Preço</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 sm:py-32 bg-zinc-900/20 rounded-[3rem] sm:rounded-[4rem] border border-dashed border-white/5"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
                  <Search size={28} className="text-white/10 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white/20 uppercase tracking-widest mb-4">Nenhum produto encontrado</h3>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Todos');
                    setMaxPrice(maxProductPrice);
                  }}
                  className="text-white/40 hover:text-white font-black uppercase text-[9px] sm:text-[10px] tracking-[0.4em] transition-colors"
                >
                  Limpar todos os filtros
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
