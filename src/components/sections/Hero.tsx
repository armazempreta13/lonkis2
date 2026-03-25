import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ChevronDown } from 'lucide-react';

import { siteConfig } from '../../siteConfig';
import { useAnimationConfig } from '../../hooks/useAnimationConfig';
import { Button } from '../ui/Button';
import { QuoteModal } from '../ui/QuoteModal';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const scrollToServices = () =>
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const BackgroundFx = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0 opacity-20"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
  </div>
);

const BadgeRow = () => (
  <div className="flex flex-col items-center gap-1 sm:gap-4 md:gap-6 lg:flex-row lg:items-start">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="inline-block rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 backdrop-blur-md"
    >
      <span className="text-[7px] sm:text-[8px] md:text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] md:tracking-[0.4em] text-white/60">
        {siteConfig.pages.home.hero.badge}
      </span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center gap-1.5 sm:gap-2 text-emerald-500/80"
    >
      <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" aria-hidden="true" />
      <span className="text-[7px] sm:text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em]">
        {siteConfig.pages.home.hero.experience}
      </span>
    </motion.div>
  </div>
);

const Heading = () => {
  const animationConfig = useAnimationConfig();
  
  return (
    <>
      <style>{animationConfig.animation.css}</style>
      <h1 className={`font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.8] tracking-tighter text-white ${animationConfig.animation.className}`}>
        {siteConfig.pages.home.hero.title}
        <br />
        <span className="text-white/20 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          {siteConfig.pages.home.hero.titleAccent}
        </span>
      </h1>
    </>
  );
};

const Subtitle = () => (
  <p className="mx-auto max-w-lg text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed text-white/40 lg:mx-0">
    {siteConfig.pages.home.hero.subtitle}
  </p>
);

interface CtaGroupProps {
  onQuoteClick: () => void;
}

const CtaGroup = ({ onQuoteClick }: CtaGroupProps) => (
  <div className="flex flex-col gap-1 sm:gap-4 md:gap-6 sm:flex-row lg:justify-start pt-0.5 sm:pt-0 md:pt-0">
    <Button
      className="rounded-xl sm:rounded-2xl px-4 sm:px-8 md:px-12 py-2.5 sm:py-4 md:py-6 text-[8px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] shadow-2xl shadow-white/5 transition-all"
      onClick={onQuoteClick}
      ariaLabel={siteConfig.pages.home.hero.ctaPrimary}
    >
      {siteConfig.pages.home.hero.ctaPrimary}
    </Button>

    <Button
      variant="outline"
      className="rounded-xl sm:rounded-2xl border-white/10 px-4 sm:px-8 md:px-12 py-2.5 sm:py-4 md:py-6 text-[8px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] transition-all hover:border-white hover:bg-white/5"
      onClick={scrollToServices}
      ariaLabel={siteConfig.pages.home.hero.ctaSecondary}
    >
      {siteConfig.pages.home.hero.ctaSecondary}
    </Button>
  </div>
);

const ProductImage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, rotateY: 20 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="relative flex items-center justify-center perspective-1000 hidden sm:flex"
  >
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="group relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[700px]"
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-5 -z-10 rounded-[4.5rem] bg-white/5 blur-3xl transition-all duration-1000 group-hover:bg-white/10"
      />

      {/* Card */}
      <div className="relative overflow-hidden rounded-[3.5rem] border border-white/10 shadow-2xl">
        <img
          src="https://i.imgur.com/VOKsdKH.png"
          alt="Smartphone premium em destaque"
          className="h-auto w-full scale-[1.12] grayscale transition-all duration-1000 group-hover:scale-[1.22] group-hover:grayscale-0"
        />

        {/* Overlay gradient on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      </div>
    </motion.div>
  </motion.div>
);

const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5, duration: 1 }}
    aria-hidden="true"
    className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 hidden sm:flex -translate-x-1/2 flex-col items-center gap-2 sm:gap-3"
  >
    <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.4em] text-white/20">
      Scroll
    </span>
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="h-10 sm:h-12 w-px bg-gradient-to-b from-white/20 via-white/40 to-transparent"
    />
  </motion.div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
      <section className="relative flex sm:min-h-screen items-start sm:items-center justify-center overflow-hidden bg-black pb-3 sm:pb-8 md:pb-10 pt-32 sm:pt-24 md:pt-32 px-4 sm:px-6">
      <BackgroundFx />

      {/* Content grid */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 md:gap-20 lg:items-center gap-1 sm:gap-8 md:gap-12">
        {/* Left column — copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left order-2 sm:order-1 space-y-1.5 sm:space-y-3 md:space-y-4"
        >
          <BadgeRow />
          <Heading />
          <Subtitle />
          <CtaGroup onQuoteClick={() => setIsModalOpen(true)} />
        </motion.div>

        {/* Right column — image */}
        <motion.div className="order-1 sm:order-2">
          <ProductImage />
        </motion.div>
      </div>

      <ScrollIndicator />

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName="Orçamento Geral"
        price="Consultar"
      />
    </section>
  );
};