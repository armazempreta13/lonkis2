import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';

interface CategoryFilterProps {
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

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedMainCategory,
  selectedSubcategory,
  onMainCategoryChange,
  onSubcategoryChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCategory = selectedMainCategory ? categories[selectedMainCategory] : null;
  const selectedCategoryData = selectedCategory ? categories[selectedMainCategory!] : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset subcategory when main category changes
  useEffect(() => {
    if (!selectedMainCategory || !selectedCategoryData?.subcategories.includes(selectedSubcategory || '')) {
      onSubcategoryChange(null);
    }
  }, [selectedMainCategory, selectedCategoryData, selectedSubcategory, onSubcategoryChange]);

  const categoryList = Object.values(categories);

  return (
    <div className="w-full">
      {/* Main Category Selector */}
      <div className="relative mb-6" ref={dropdownRef}>
        <motion.button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full md:w-80 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between text-white hover:bg-white/10 hover:border-white/20 transition-all group"
        >
          <div className="flex items-center gap-3">
            {selectedCategory ? (
              <>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedCategory.color} flex items-center justify-center`}>
                  {React.createElement(selectedCategory.icon, { size: 16, className: "text-white" })}
                </div>
                <span className="font-semibold text-sm">{selectedCategory.name}</span>
              </>
            ) : (
              <span className="text-white/40 text-sm font-medium">Selecionar categoria...</span>
            )}
          </div>
          <ChevronDown
            size={18}
            className={`text-white/40 group-hover:text-white transition-all ${showDropdown ? 'rotate-180' : ''}`}
          />
        </motion.button>

        {/* Category Dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 md:w-80 mt-2 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
            >
              <div className="max-h-96 overflow-y-auto scrollbar-hide">
                {/* Clear Selection */}
                <motion.button
                  onClick={() => {
                    onMainCategoryChange(null);
                    onSubcategoryChange(null);
                    setShowDropdown(false);
                  }}
                  className="w-full px-6 py-3 text-left text-white/40 hover:bg-white/5 transition-colors text-sm font-medium border-b border-white/5"
                >
                  ✕ Limpar filtro
                </motion.button>

                {/* Category Items */}
                {categoryList.map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => {
                      onMainCategoryChange(cat.id);
                      setShowDropdown(false);
                    }}
                    whileHover={{ x: 4 }}
                    className={`w-full px-6 py-3 text-left flex items-center gap-3 transition-all ${
                      selectedMainCategory === cat.id
                        ? 'bg-white/10 border-l-2 border-l-white'
                        : 'border-l-2 border-l-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0`}>
                      {React.createElement(cat.icon, { size: 16, className: "text-white" })}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white text-sm font-semibold">{cat.name}</p>
                      <p className="text-white/40 text-xs">{cat.subcategories.length} subcategorias</p>
                    </div>
                    {selectedMainCategory === cat.id && (
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subcategory Tags */}
      <AnimatePresence>
        {selectedCategoryData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {/* All Subcategories Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSubcategoryChange(null)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedSubcategory === null
                    ? `bg-gradient-to-r ${selectedCategoryData.color} text-white shadow-lg`
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                Todos
              </motion.button>

              {/* Subcategory Items */}
              {selectedCategoryData.subcategories.map((subcat, idx) => (
                <motion.button
                  key={subcat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSubcategoryChange(selectedSubcategory === subcat ? null : subcat)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    selectedSubcategory === subcat
                      ? `bg-gradient-to-r ${selectedCategoryData.color} text-white shadow-lg`
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {subcat}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      <AnimatePresence>
        {(selectedMainCategory || selectedSubcategory) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/40 text-sm">Filtros ativos:</span>
              {selectedMainCategory && (
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium">
                  {selectedCategory?.name}
                </span>
              )}
              {selectedSubcategory && (
                <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium">
                  {selectedSubcategory}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                onMainCategoryChange(null);
                onSubcategoryChange(null);
              }}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={16} className="text-white/40 hover:text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
