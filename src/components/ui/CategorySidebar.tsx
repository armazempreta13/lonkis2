import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X } from 'lucide-react';

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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(selectedMainCategory);

  const categoryList = Object.values(categories);
  const selectedCategory = selectedMainCategory ? categories[selectedMainCategory] : null;

  const handleCategoryClick = (categoryId: string) => {
    // Se clicar na mesma categoria expandida, colapsa. Senão, expande e seleciona
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      onMainCategoryChange(null);
      onSubcategoryChange(null);
    } else {
      setExpandedCategory(categoryId);
      onMainCategoryChange(categoryId);
      onSubcategoryChange(null);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    onSubcategoryChange(selectedSubcategory === subcategory ? null : subcategory);
  };

  return (
    <div className="w-full md:w-72 lg:w-80">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-6">
          🏷️ Categorias
        </h3>

        {/* Clear All Button */}
        <AnimatePresence>
          {(selectedMainCategory || selectedSubcategory) && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={() => {
                onMainCategoryChange(null);
                onSubcategoryChange(null);
                setExpandedCategory(null);
              }}
              className="w-full mb-4 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-white/70 hover:text-white transition-all text-sm font-medium"
            >
              <X size={14} />
              Limpar Filtros
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Categories List */}
      <div className="space-y-1">
        {categoryList.map((cat, idx) => {
          const isExpanded = expandedCategory === cat.id;
          const isSelected = selectedMainCategory === cat.id;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              {/* Category Button */}
              <motion.button
                onClick={() => handleCategoryClick(cat.id)}
                whileHover={{ x: 4 }}
                className={`w-full px-4 py-3.5 rounded-xl flex items-center justify-between transition-all group ${
                  isSelected
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-white/20`
                    : 'bg-white/5 hover:bg-white/8 text-white/80 hover:text-white border border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0 ${
                      !isSelected ? 'opacity-60 group-hover:opacity-100' : ''
                    } transition-opacity`}
                  >
                    {React.createElement(cat.icon, {
                      size: 16,
                      className: 'text-white',
                    })}
                  </div>
                  <div className="text-left">
                    <p className={`font-bold text-sm ${isSelected ? 'text-white' : ''}`}>
                      {cat.name}
                    </p>
                    <p
                      className={`text-xs ${
                        isSelected ? 'text-white/70' : 'text-white/40'
                      }`}
                    >
                      {cat.subcategories.length} itens
                    </p>
                  </div>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={isSelected ? 'text-white' : 'text-white/40 group-hover:text-white/60'}
                >
                  <ChevronRight size={18} />
                </motion.div>
              </motion.button>

              {/* Subcategories */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-6 pl-3 border-l border-white/10 space-y-1">
                      {/* "Todos" option */}
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onClick={() => onSubcategoryChange(null)}
                        whileHover={{ x: 4 }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                          selectedSubcategory === null && isSelected
                            ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-white/10`
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        ✓ Todos
                      </motion.button>

                      {/* Subcategories */}
                      {cat.subcategories.map((subcat, subIdx) => (
                        <motion.button
                          key={subcat}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: subIdx * 0.05 }}
                          onClick={() => handleSubcategoryClick(subcat)}
                          whileHover={{ x: 4 }}
                          className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                            selectedSubcategory === subcat
                              ? `bg-gradient-to-r ${cat.color} text-white shadow-lg shadow-white/10`
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {selectedSubcategory === subcat ? '◆ ' : '◇ '}
                          {subcat}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Active Filter Badge */}
      <AnimatePresence>
        {(selectedMainCategory || selectedSubcategory) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 pt-6 border-t border-white/10"
          >
            <p className="text-xs text-white/40 uppercase tracking-wider font-bold mb-3">
              Filtro Ativo
            </p>
            <div className="space-y-2">
              {selectedMainCategory && (
                <div className={`px-3 py-2 rounded-lg bg-gradient-to-r ${selectedCategory?.color} text-white text-sm font-semibold`}>
                  {selectedCategory?.name}
                </div>
              )}
              {selectedSubcategory && (
                <div className="px-3 py-2 rounded-lg bg-white/10 text-white/90 text-sm font-semibold">
                  → {selectedSubcategory}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
