import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ui/ProductCard';
import { CategorySidebar } from '../components/ui/CategorySidebar';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../siteConfig';

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(12);

  // Load products per page preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('productsPerPage');
    if (saved) {
      setProductsPerPage(Number(saved));
    }
  }, []);

  const handleProductsPerPageChange = (value: number) => {
    setProductsPerPage(value);
    localStorage.setItem('productsPerPage', String(value));
    setCurrentPage(1); // Reset to first page
  };

  const products = siteConfig.pages.products?.items || [];
  const categories = siteConfig.pages.products?.categories || {};
  const maxProductPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 10000;

  // Map old category strings to new main categories (fallback mapping)
  const mapLegacyCategory = (productCategory: string): string | null => {
    const categoryMap: Record<string, string> = {
      'iPhone Novos': 'smartphones',
      'iPhone': 'smartphones',
      'Video Game': 'gaming',
      'PS5': 'gaming',
      'XBOX': 'gaming',
      'AirPods': 'audio',
      'Apple Watch': 'wearables',
      'JBL': 'audio',
      'ACESSÓRIOS': 'acessorios',
      'CARREGADORES': 'acessorios',
      'CABOS': 'acessorios',
      'FONES': 'audio',
      'CAIXAS DE SOM': 'audio',
      'CELULARES': 'smartphones',
      'TABLETS': 'tablets',
      'RELÓGIOS': 'wearables',
      'CANETAS': 'acessorios',
      'COMPUTADORES': 'acessorios',
      'GAMER': 'gaming',
      'SMARTWATCH': 'wearables',
      'APARELHOS PARA TV': 'acessorios',
      'RASTREADORES': 'acessorios',
      'ROBÔ ASPIRADOR': 'acessorios',
      'STARLINK': 'smart_home',
      'CLIMATIZADORES': 'acessorios',
    };
    return categoryMap[productCategory] || null;
  };

  // Map product name to subcategory
  const getProductSubcategory = (productName: string, mainCategory: string): string | null => {
    const name = productName.toUpperCase();
    
    if (mainCategory === 'smartphones') {
      if (name.includes('IPHONE')) return 'iPhone';
      if (name.includes('SAMSUNG') || name.includes('GALAXY')) return 'Samsung';
      if (name.includes('XIAOMI') || name.includes('REDMI') || name.includes('POCO') || name.includes('NOTE')) return 'Xiaomi';
      if (name.includes('MOTOROLA')) return 'Motorola';
      return 'Outros';
    }
    
    if (mainCategory === 'tablets') {
      if (name.includes('IPAD') || name.includes('MAGIC KEYBOARD')) return 'iPad';
      if (name.includes('SAMSUNG') || name.includes('GALAXY TAB')) return 'Samsung Galaxy Tab';
      return 'Outros';
    }
    
    if (mainCategory === 'wearables') {
      if (name.includes('APPLE WATCH')) return 'Apple Watch';
      if (name.includes('SMARTBAND') || name.includes('XIAOMI') || name.includes('REDMI')) return 'Smartband';
      if (name.includes('RELÓGIO')) return 'Relógios';
      return 'Relógios';
    }
    
    if (mainCategory === 'audio') {
      if (name.includes('AIRPODS')) return 'Fones Bluetooth';
      if (name.includes('JBL') || name.includes('CAIXA') || name.includes('BOOMBOX')) return 'Caixas de Som';
      if (name.includes('FONE') || name.includes('HEADPHONES')) return 'Headphones';
      if (name.includes('MICROFONE') || name.includes('LAPELA')) return 'Auriculares';
      return 'Fones Bluetooth';
    }
    
    if (mainCategory === 'acessorios') {
      if (name.includes('CARREGADOR') || name.includes('FONTE') || name.includes('ANATEL')) return 'Carregadores';
      if (name.includes('CABO') || name.includes('USB')) return 'Cabos';
      if (name.includes('CAPA') || name.includes('CAPINHA')) return 'Capinhas';
      if (name.includes('PELÍCULA') || name.includes('VIDRO') || name.includes('PROTETOR')) return 'Película de Vidro';
      if (name.includes('SUPORTE') || name.includes('MALA') || name.includes('BOLSA')) return 'Suportes';
      if (name.includes('PENCIL') || name.includes('CANETA')) return 'Canetas';
      return 'Diversos';
    }
    
    if (mainCategory === 'gaming') {
      if (name.includes('PS5') || name.includes('PLAYSTATION')) return 'PlayStation';
      if (name.includes('XBOX')) return 'Xbox';
      if (name.includes('NINTENDO') || name.includes('VR') || name.includes('CONTROLE') || name.includes('FONE')) return 'Acessórios Gamer';
      return 'Acessórios Gamer';
    }
    
    if (mainCategory === 'smart_home') {
      if (name.includes('STARLINK')) return 'Assistentes';
      if (name.includes('CÂMERA')) return 'Câmeras';
      if (name.includes('WIFI') || name.includes('CONTROLE')) return 'Controles Inteligentes';
      return 'Assistentes';
    }
    
    return null;
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = p.price <= maxPrice;
      
      // If no main category selected, show all
      if (!selectedMainCategory) {
        return matchesSearch && matchesPrice;
      }
      
      // Map the product's legacy category to new system
      const productMainCategory = mapLegacyCategory(p.category);
      
      // Check main category match
      const matchesMainCategory = !productMainCategory || productMainCategory === selectedMainCategory;
      
      if (!matchesMainCategory) {
        return false;
      }
      
      // If subcategory is selected, filter by product subcategory (derived from name)
      if (selectedSubcategory) {
        const productSubcategory = getProductSubcategory(p.name, selectedMainCategory);
        const matchesSubcategory = productSubcategory === selectedSubcategory;
        return matchesSearch && matchesPrice && matchesSubcategory;
      }
      
      return matchesSearch && matchesPrice;
    });

    if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'newest') filtered.sort((a, b) => b.id - a.id);
    if (sortBy === 'random') filtered.sort(() => Math.random() - 0.5);

    return filtered;
  }, [searchTerm, selectedMainCategory, selectedSubcategory, sortBy, maxPrice, productsPerPage]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedMainCategory(null);
    setSelectedSubcategory(null);
    setMaxPrice(maxProductPrice);
    setSortBy('name');
    setCurrentPage(1);
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
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-6 text-white leading-[0.85]"
            >
              {siteConfig.pages.products.hero.title} <br />
              <span className="text-white/20">{siteConfig.pages.products.hero.titleAccent}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl text-white/40 text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed"
            >
              {siteConfig.pages.products.hero.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Information Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-6 md:p-8 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl sm:rounded-3xl backdrop-blur-sm"
          >
            <div className="flex gap-3 sm:gap-4 md:gap-6 items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-amber-500/20">
                  <span className="text-base sm:text-lg">ℹ️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xs sm:text-sm md:text-base font-black text-amber-400 uppercase tracking-widest mb-1 sm:mb-2">
                  Importante - Loja Física
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-white/70 leading-relaxed">
                  <span className="text-white font-semibold">Os produtos mostrados aqui são do nosso mostruário.</span> Todas as compras são realizadas presencialmente em nossa loja física. Não realizamos envios pelos Correios ou qualquer outro serviço de entrega. Visite-nos para conhecer os produtos e finalizar sua compra!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Controls Bar */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col gap-4 md:gap-6 md:grid md:grid-cols-2 md:items-end md:justify-between">
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
                <div className="sm:min-w-[220px] relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 sm:py-5 px-5 pr-12 text-[10px] sm:text-xs font-black text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all cursor-pointer appearance-none uppercase tracking-widest"
                  >
                    <option value="name" className="bg-zinc-900">Nome (A-Z)</option>
                    <option value="price-asc" className="bg-zinc-900">Menor Preço</option>
                    <option value="price-desc" className="bg-zinc-900">Maior Preço</option>
                    <option value="newest" className="bg-zinc-900">Mais Novo</option>
                    <option value="random" className="bg-zinc-900">Aleatório</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Filter Toggle Button with Active Filters Badge */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-[10px] font-black text-white/40 hover:text-white hover:border-white/30 uppercase tracking-[0.3em] transition-all relative"
              >
                <SlidersHorizontal size={18} />
                Filtros
                {(searchTerm || selectedMainCategory || selectedSubcategory || maxPrice !== maxProductPrice || sortBy !== 'name') && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[7px] font-black px-2 py-1 rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {[searchTerm ? 1 : 0, selectedMainCategory ? 1 : 0, selectedSubcategory ? 1 : 0, maxPrice !== maxProductPrice ? 1 : 0, sortBy !== 'name' ? 1 : 0].reduce((a, b) => a + b, 0)}
                  </motion.div>
                )}
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
                  {/* Categories - Now using CategorySidebar for mobile */}
                  <div className="mb-8">
                    <label className="block text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Categorias</label>
                    <CategorySidebar
                      categories={categories}
                      selectedMainCategory={selectedMainCategory}
                      selectedSubcategory={selectedSubcategory}
                      onMainCategoryChange={setSelectedMainCategory}
                      onSubcategoryChange={setSelectedSubcategory}
                    />
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

                {/* Category Sidebar */}
                <div className="mb-12">
                  <CategorySidebar
                    categories={categories}
                    selectedMainCategory={selectedMainCategory}
                    selectedSubcategory={selectedSubcategory}
                    onMainCategoryChange={setSelectedMainCategory}
                    onSubcategoryChange={setSelectedSubcategory}
                  />
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
                {(searchTerm || selectedMainCategory || selectedSubcategory || maxPrice !== maxProductPrice) && (
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
                    Exibindo <span className="text-white">{startIndex + 1}</span> a <span className="text-white">{Math.min(endIndex, filteredProducts.length)}</span> de <span className="text-white">{filteredProducts.length}</span> produtos
                  </p>
                </div>
              </motion.div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <>
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
                  >
                    <AnimatePresence mode="popLayout">
                      {paginatedProducts.map((product, index) => (
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-16 flex items-center justify-center gap-3 flex-wrap"
                    >
                      {/* Previous Button */}
                      <button
                        onClick={() => {
                          setCurrentPage(Math.max(1, currentPage - 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className={`px-4 py-3 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all border ${
                          currentPage === 1
                            ? 'bg-white/5 text-white/20 border-white/10 cursor-not-allowed'
                            : 'bg-white/10 text-white/40 border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40'
                        }`}
                      >
                        ← Anterior
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, index) => {
                          const pageNum = index + 1;
                          const isFirstPage = pageNum === 1;
                          const isLastPage = pageNum === totalPages;
                          const isNearCurrentPage = Math.abs(pageNum - currentPage) <= 1;
                          const shouldShow = isFirstPage || isLastPage || isNearCurrentPage;

                          if (!shouldShow) {
                            // Check if we should show ellipsis
                            if ((pageNum === 2 && currentPage > 3) || (pageNum === totalPages - 1 && currentPage < totalPages - 2)) {
                              return null; // Will be handled by ellipsis logic below
                            }
                            return null;
                          }

                          if (pageNum === 2 && currentPage > 3) {
                            return (
                              <span key="ellipsis-left" className="text-white/20 px-1">
                                ...
                              </span>
                            );
                          }

                          if (pageNum === totalPages - 1 && currentPage < totalPages - 2) {
                            return (
                              <span key="ellipsis-right" className="text-white/20 px-1">
                                ...
                              </span>
                            );
                          }

                          return (
                            <motion.button
                              key={pageNum}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setCurrentPage(pageNum);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`w-10 h-10 rounded-lg font-black text-[10px] transition-all border ${
                                currentPage === pageNum
                                  ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                                  : 'bg-white/10 text-white/40 border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40'
                              }`}
                            >
                              {pageNum}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => {
                          setCurrentPage(Math.min(totalPages, currentPage + 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-3 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] transition-all border ${
                          currentPage === totalPages
                            ? 'bg-white/5 text-white/20 border-white/10 cursor-not-allowed'
                            : 'bg-white/10 text-white/40 border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40'
                        }`}
                      >
                        Próximo →
                      </button>
                    </motion.div>
                  )}
                </>
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
