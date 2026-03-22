import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ui/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../siteConfig';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);

  const products = siteConfig.pages.products?.items || [];
  const categories = siteConfig.pages.products?.categories || ['Todos'];
  const maxProductPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 10000;

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

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todos');
    setMaxPrice(maxProductPrice);
    setSortBy('name');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black pb-24 relative overflow-hidden"
    >
      <SEO 
        title={`Produtos | ${siteConfig.brand.name}`}
        description="Confira nossa seleção de acessórios premium, carregadores, cabos e smartphones com garantia."
      />
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1 bg-white/5 backdrop-blur-md rounded-full mb-6 border border-white/10"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">
                {siteConfig.pages.products.hero.badge}
              </span>
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-6 text-white leading-[0.85]"
            >
              {siteConfig.pages.products.hero.title} <br />
              <span className="text-white/20">{siteConfig.pages.products.hero.titleAccent}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl text-white/40 text-base md:text-lg font-medium leading-relaxed"
            >
              {siteConfig.pages.products.hero.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Controls Bar */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-end md:justify-between">
              {/* Search and Sort on Desktop */}
              <div className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Search */}
                <div className="flex-1 relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="BUSCAR PRODUTOS..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 sm:py-5 pl-14 pr-6 text-[10px] sm:text-xs text-white focus:outline-none focus:border-white/40 transition-all font-medium placeholder:text-white/10 focus:bg-white/10"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Sort */}
                <div className="sm:min-w-[200px] relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 sm:py-5 px-5 pr-12 text-[10px] sm:text-xs font-black text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all cursor-pointer appearance-none uppercase tracking-widest"
                  >
                    <option value="name" className="bg-zinc-900">Nome (A-Z)</option>
                    <option value="price-asc" className="bg-zinc-900">Menor Preço</option>
                    <option value="price-desc" className="bg-zinc-900">Maior Preço</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-black text-white/40 hover:text-white hover:border-white/30 uppercase tracking-[0.3em] transition-all"
              >
                <SlidersHorizontal size={18} />
                Filtros
              </button>
            </div>

            {/* Mobile Filters Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/10 rounded-2xl md:hidden"
                >
                  {/* Categories */}
                  <div className="mb-8">
                    <label className="block text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Categorias</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setShowFilters(false);
                          }}
                          className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
                            selectedCategory === cat 
                              ? "bg-white text-black border-white" 
                              : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Preço Máximo</label>
                      <span className="text-[10px] font-black text-white">R$ {maxPrice.toLocaleString('pt-BR')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max={maxProductPrice} 
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between mt-4">
                      <span className="text-[9px] font-black text-white/10">R$ 0</span>
                      <span className="text-[9px] font-black text-white/10">R$ {maxProductPrice.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Filters Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
            <aside className="hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900/40 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 shadow-2xl sticky top-32"
              >
                <h2 className="font-display text-2xl font-black mb-10 flex items-center gap-3 tracking-tight text-white uppercase">
                  <SlidersHorizontal size={20} className="text-white/20" /> Filtros
                </h2>
                
                {/* Search */}
                <div className="mb-12">
                  <label className="block text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Busca</label>
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
                    <input 
                      type="text" 
                      placeholder="O QUE VOCÊ PROCURA?" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[10px] text-white focus:outline-none focus:border-white/40 transition-all font-medium placeholder:text-white/10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-12">
                  <label className="block text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-6">Categorias</label>
                  <div className="flex flex-col gap-4 space-y-2">
                    {categories.map((cat, index) => (
                      <motion.button
                        key={cat}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 rounded-2xl border flex items-center justify-between group ${
                          selectedCategory === cat 
                            ? "bg-white text-black border-white shadow-lg" 
                            : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span>{cat}</span>
                        {selectedCategory === cat && (
                          <motion.div 
                            className="w-2 h-2 bg-black rounded-full"
                            layoutId="activeCategory"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Preço Máximo</label>
                    <motion.span 
                      key={maxPrice}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-[10px] font-black text-emerald-400"
                    >
                      R$ {maxPrice.toLocaleString('pt-BR')}
                    </motion.span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max={maxProductPrice} 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-colors"
                  />
                  <div className="flex justify-between mt-4">
                    <span className="text-[9px] font-black text-white/10">R$ 0</span>
                    <span className="text-[9px] font-black text-white/10">R$ {maxProductPrice.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(searchTerm || selectedCategory !== 'Todos' || maxPrice !== maxProductPrice) && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClearFilters}
                    className="w-full py-3 px-5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-2xl text-[9px] font-black text-white/60 hover:text-white uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    Limpar Filtros
                  </motion.button>
                )}
              </motion.div>
            </aside>

            {/* Products Grid */}
            <main>
              {/* Results Info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    Exibindo <span className="text-white">{filteredProducts.length}</span> de <span className="text-white">{products.length}</span> produtos
                  </p>
                </div>
              </motion.div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-32 bg-zinc-900/20 rounded-[3rem] border border-dashed border-white/5 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8"
                  >
                    <Search size={40} className="text-white/10" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-white/20 uppercase tracking-widest mb-4 text-center">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-white/30 text-sm mb-8 max-w-xs text-center">
                    Tente ajustar seus filtros ou fazer uma nova busca
                  </p>
                  <button 
                    onClick={handleClearFilters}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-2xl text-[9px] font-black text-white/60 hover:text-white uppercase tracking-[0.3em] transition-all duration-300"
                  >
                    Limpar Todos os Filtros
                  </button>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
