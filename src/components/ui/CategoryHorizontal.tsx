import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CategoryHorizontalProps {
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

export const CategoryHorizontal: React.FC<CategoryHorizontalProps> = ({
  categories,
  selectedMainCategory,
  selectedSubcategory,
  onMainCategoryChange,
  onSubcategoryChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const categoryList = Object.values(categories);
  const selectedCategory = selectedMainCategory ? categories[selectedMainCategory] : null;

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  const handleScroll = () => {
    checkScroll();
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Categories - Horizontal Scroll */}
      <div className="relative">
        {/* Left Scroll Button */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gradient-to-r from-black to-transparent flex items-center justify-center hover:from-black/80"
            >
              <ChevronLeft size={20} className="text-white/60 hover:text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right Scroll Button */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gradient-to-l from-black to-transparent flex items-center justify-center hover:from-black/80"
            >
              <ChevronRight size={20} className="text-white/60 hover:text-white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Categories Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-2 sm:gap-3 overflow-x-auto scroll-smooth scrollbar-hide px-2"
        >
          {/* Clear/All Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onMainCategoryChange(null);
              onSubcategoryChange(null);
            }}
            className={`flex-shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-tight transition-all whitespace-nowrap min-h-[44px] flex items-center gap-2 ${
              selectedMainCategory === null
                ? 'bg-white/20 text-white border border-white/40 shadow-lg'
                : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 hover:border-white/20'
            }`}
          >
            <span>🏠 Todos</span>
          </motion.button>

          {/* Category Items */}
          {categoryList.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedMainCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (selectedMainCategory === cat.id) {
                    onMainCategoryChange(null);
                    onSubcategoryChange(null);
                  } else {
                    onMainCategoryChange(cat.id);
                    onSubcategoryChange(null);
                  }
                }}
                className={`flex-shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm uppercase tracking-tight transition-all whitespace-nowrap min-h-[44px] flex items-center gap-2 border ${
                  isSelected
                    ? `bg-gradient-to-r ${cat.color} text-white border-white/40 shadow-lg`
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border-white/10 hover:border-white/20'
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Subcategories - Only show when category is selected */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 px-2">
              {/* Show all subcategory option */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSubcategoryChange(null)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-xs uppercase tracking-tight transition-all min-h-[36px] flex items-center ${
                  selectedSubcategory === null
                    ? `bg-gradient-to-r ${selectedCategory.color} text-white shadow-lg`
                    : 'bg-white/10 text-white/70 hover:bg-white/15 border border-white/10'
                }`}
              >
                Todos
              </motion.button>

              {/* Subcategory items */}
              {selectedCategory.subcategories.map((subcat, idx) => {
                const isSubSelected = selectedSubcategory === subcat;
                return (
                  <motion.button
                    key={subcat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      onSubcategoryChange(
                        selectedSubcategory === subcat ? null : subcat
                      )
                    }
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-xs uppercase tracking-tight transition-all min-h-[36px] flex items-center ${
                      isSubSelected
                        ? `bg-gradient-to-r ${selectedCategory.color} text-white shadow-lg`
                        : 'bg-white/10 text-white/70 hover:bg-white/15 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {subcat}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filter Badge */}
      <AnimatePresence>
        {(selectedMainCategory || selectedSubcategory) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-2 flex flex-wrap gap-2"
          >
            {selectedMainCategory && selectedCategory && (
              <motion.div
                layout
                className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${selectedCategory.color} text-white text-[10px] sm:text-xs font-black tracking-tight flex items-center gap-2`}
              >
                {selectedCategory.name}
                <button
                  onClick={() => {
                    onMainCategoryChange(null);
                    onSubcategoryChange(null);
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
            {selectedSubcategory && (
              <motion.div
                layout
                className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-[10px] sm:text-xs font-black tracking-tight flex items-center gap-2 border border-white/20"
              >
                → {selectedSubcategory}
                <button
                  onClick={() => onSubcategoryChange(null)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
