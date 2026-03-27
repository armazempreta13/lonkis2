import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, RotateCcw, Check } from 'lucide-react';

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

  useEffect(() => {
    if (selectedMainCategory && selectedMainCategory !== expandedCategory) {
      setExpandedCategory(selectedMainCategory);
    }
  }, [selectedMainCategory, expandedCategory]);

  const categoryList = Object.values(categories);
  const selectedCategory = selectedMainCategory ? categories[selectedMainCategory] : null;

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
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
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.35em] mb-4">
          🏷️ Categorias
        </h3>
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
            className="w-full px-4 py-3 bg-gradient-to-br from-zinc-700/40 to-zinc-800/40 hover:from-zinc-700/60 hover:to-zinc-800/60 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl flex items-center justify-center gap-2.5 text-white/70 hover:text-white transition-all text-[10px] font-black uppercase tracking-wider shadow-lg hover:shadow-xl hover:shadow-white/5"
          >
            <RotateCcw size={13} strokeWidth={2.5} />
            Limpar
          </motion.button>
        )}
      </AnimatePresence>

      {/* Categories List */}
      <div className="space-y-2.5">
        {categoryList.map((cat, idx) => {
          const isExpanded = expandedCategory === cat.id;
          const isSelected = selectedMainCategory === cat.id;

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
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full px-4 py-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 group overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-br from-zinc-700/60 to-zinc-800/40 text-white shadow-lg shadow-white/10 border border-white/20`
                    : 'bg-gradient-to-br from-zinc-800/40 to-zinc-900/60 hover:from-zinc-800/60 hover:to-zinc-900/50 text-white/80 hover:text-white border border-white/8 hover:border-white/15'
                }`}
              >
                {/* Content */}
                <div className="flex items-center gap-3 flex-1 text-left">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: isSelected ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0 shadow-lg ${
                      !isSelected ? 'opacity-70 group-hover:opacity-100' : 'shadow-white/20'
                    } transition-opacity`}
                  >
                    {React.createElement(cat.icon, {
                      size: 17,
                      className: 'text-white',
                      strokeWidth: 2.5,
                    })}
                  </motion.div>

                  {/* Text */}
                  <div className="text-left min-w-0">
                    <p className={`font-black text-xs tracking-tight truncate ${isSelected ? 'text-white' : 'text-white/90'}`}>
                      {cat.name}
                    </p>
                    <p className={`text-[9px] font-semibold ${isSelected ? 'text-white/60' : 'text-white/30'}`}>
                      {cat.subcategories.length} itens
                    </p>
                  </div>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ${isSelected ? 'text-white' : 'text-white/30 group-hover:text-white/50'}`}
                >
                  <ChevronDown size={18} strokeWidth={2.5} />
                </motion.div>
              </motion.button>

              {/* Subcategories */}
              <AnimatePresence>
                {isExpanded && cat.subcategories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-3 pl-3 border-l border-white/10 space-y-2">
                      {/* All option */}
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSubcategoryChange(null);
                        }}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-[11px] font-black tracking-tight flex items-center gap-2 group ${
                          selectedSubcategory === null && isSelected
                            ? `bg-gradient-to-br from-zinc-700/40 to-zinc-800/30 text-white`
                            : 'text-white/50 hover:text-white/70 hover:bg-white/5'
                        }`}
                      >
                        <div className="w-3 h-3 rounded-full border border-current opacity-60 flex-shrink-0" />
                        <span>Todos</span>
                      </motion.button>

                      {/* Subcategories */}
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
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all text-[11px] font-black tracking-tight flex items-center gap-2 group ${
                              isSubSelected
                                ? `bg-gradient-to-br from-zinc-700/40 to-zinc-800/30 text-white`
                                : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex-shrink-0 w-3 h-3 flex items-center justify-center">
                              {isSubSelected ? (
                                <Check size={12} className="text-white font-black" />
                              ) : (
                                <div className="w-2 h-2 rounded-full border border-current opacity-40" />
                              )}
                            </div>
                            <span className="truncate">{subcat}</span>
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

      {/* Active Filters */}
      <AnimatePresence>
        {(selectedMainCategory || selectedSubcategory) && (
          <motion.div
            key="active-filters"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-6 pt-4 border-t border-white/10 space-y-2"
          >
            <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-black">
              Filtro Ativo
            </p>
            {selectedMainCategory && selectedCategory && (
              <motion.div
                layout
                className={`px-3 py-2 rounded-lg bg-gradient-to-br from-zinc-700/40 to-zinc-800/30 text-white/90 text-[10px] font-black tracking-tight border border-white/10`}
              >
                {selectedCategory.name}
              </motion.div>
            )}
            {selectedSubcategory && (
              <motion.div
                layout
                className="px-3 py-2 rounded-lg bg-white/5 text-white/70 text-[10px] font-black tracking-tight border border-white/8"
              >
                → {selectedSubcategory}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
