import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Filter, RotateCcw, Check, Circle } from 'lucide-react';

interface CategorySidebarProps {
  categories: Record<string, {
    id: string;
    name: string;
    icon: React.ElementType;
    color: string;
    subcategories: string[];
  }>;
  selectedMainCategory: string | null;
  selectedSubcategory: string | null;
  onMainCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedMainCategory,
  selectedSubcategory,
  onMainCategoryChange,
  onSubcategoryChange,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // Sincronizar expandedCategory com selectedMainCategory quando muda
  useEffect(() => {
    if (selectedMainCategory && selectedMainCategory !== expandedCategory) {
      setExpandedCategory(selectedMainCategory);
    }
  }, [selectedMainCategory, expandedCategory]);

  const categoryList = Object.values(categories);
  const selectedCategory = selectedMainCategory ? categories[selectedMainCategory] : null;

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      // Já está expandido, apenas colapsa o menu
      setExpandedCategory(null);
    } else {
      // Expande a nova categoria
      setExpandedCategory(categoryId);
      onMainCategoryChange(categoryId);
      onSubcategoryChange(null);
    }
  };

  const handleSubcategoryClick = (e: React.MouseEvent, subcategory: string) => {
    e.stopPropagation();
    onSubcategoryChange(selectedSubcategory === subcategory ? null : subcategory);
  };

  const handleClearFilters = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMainCategoryChange(null);
    onSubcategoryChange(null);
    setExpandedCategory(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-1 w-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
        <h3 className="text-white font-black uppercase tracking-[0.35em] text-xs">
          FILTROS
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      {/* Clear Button */}
      <AnimatePresence>
        {(selectedMainCategory || selectedSubcategory) && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            onClick={handleClearFilters}
            className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-500/40 hover:border-red-500/60 rounded-xl flex items-center justify-center gap-2 text-red-300 hover:text-red-200 transition-all text-xs font-bold uppercase tracking-wider"
          >
            <RotateCcw size={14} />
            Limpar Tudo
          </motion.button>
        )}
      </AnimatePresence>

      {/* Categories List */}
      <div className="space-y-2">
        {categoryList.map((cat, idx) => {
          const isExpanded = expandedCategory === cat.id;
          const isSelected = selectedMainCategory === cat.id;
          const hasSubSelected = isSelected && selectedSubcategory;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              {/* Category Button */}
              <motion.button
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-4 py-4 rounded-2xl flex items-center justify-between transition-all duration-200 group relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-xl shadow-white/20 border border-white/40`
                    : 'bg-white/5 hover:bg-white/8 text-white/80 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Animated background gradient */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white to-transparent"
                    initial={{ x: -100 }}
                    whileHover={{ x: 100 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                <div className="flex items-center gap-3 flex-1 text-left relative z-10">
                  {/* Icon Container */}
                  <motion.div
                    animate={{
                      scale: isSelected ? 1.15 : 1,
                      rotate: isSelected ? 5 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0 shadow-lg ${
                      !isSelected ? 'opacity-70 group-hover:opacity-100' : 'shadow-white/30'
                    } transition-opacity`}
                  >
                    {React.createElement(cat.icon, {
                      size: 18,
                      className: 'text-white font-bold',
                    })}
                  </motion.div>

                  {/* Text */}
                  <div className="text-left">
                    <p className={`font-black text-sm tracking-tight ${isSelected ? 'text-white' : 'text-white/90'}`}>
                      {cat.name}
                    </p>
                    <p className={`text-xs font-semibold ${isSelected ? 'text-white/80' : 'text-white/40'}`}>
                      {cat.subcategories.length} itens
                    </p>
                  </div>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                  className={`relative z-10 ${isSelected ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}
                >
                  <ChevronDown size={20} strokeWidth={2.5} />
                </motion.div>
              </motion.button>

              {/* Subcategories Expandable */}
              <AnimatePresence>
                {isExpanded && cat.subcategories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 pl-4 border-l-2 border-gradient-to-b from-white/30 to-white/5 space-y-2 pb-2">
                      {/* "All" option */}
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSubcategoryChange(null);
                        }}
                        whileHover={{ x: 4 }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-bold tracking-tight flex items-center gap-2.5 group ${
                          selectedSubcategory === null && isSelected
                            ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-white/10`
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Circle size={10} className="flex-shrink-0 fill-current opacity-60" />
                        <span>Todos</span>
                      </motion.button>

                      {/* Individual Subcategories */}
                      {cat.subcategories.map((subcat, subIdx) => {
                        const isSubSelected = selectedSubcategory === subcat;
                        return (
                          <motion.button
                            type="button"
                            key={subcat}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ delay: subIdx * 0.04 }}
                            onClick={(e) => handleSubcategoryClick(e, subcat)}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-bold tracking-tight flex items-center gap-2.5 group relative overflow-hidden ${
                              isSubSelected
                                ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-white/10`
                                : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                            }`}
                          >
                            <AnimatePresence>
                              {isSubSelected ? (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 180 }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                  <Check size={14} className="flex-shrink-0 font-bold" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  className="w-3.5 h-3.5 rounded-full border-2 border-current opacity-40 group-hover:opacity-60 flex-shrink-0"
                                />
                              )}
                            </AnimatePresence>
                            <span>{subcat}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Active Filters Badge */}
      <AnimatePresence>
        {(selectedMainCategory || selectedSubcategory) && (
          <motion.div
            key="active-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <p className="text-xs text-white/40 uppercase tracking-[0.3em] font-black mb-4 flex items-center gap-2">
              <Filter size={12} />
              FILTROS ATIVOS
            </p>
            <div className="space-y-2">
              {selectedMainCategory && selectedCategory && (
                <motion.div
                  layout
                  className={`px-4 py-2.5 rounded-xl bg-gradient-to-r ${selectedCategory.color} text-white text-xs font-black tracking-tight shadow-lg shadow-white/20`}
                >
                  ✦ {selectedCategory.name}
                </motion.div>
              )}
              {selectedSubcategory && (
                <motion.div
                  layout
                  className="px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white/90 text-xs font-black tracking-tight border border-white/20"
                >
                  └─ {selectedSubcategory}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
