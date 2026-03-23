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
  <div className="mb-10 flex flex-col items-center gap-6 lg:flex-row lg:items-start">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur-md"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">
        {siteConfig.pages.home.hero.badge}
      </span>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center gap-2 text-emerald-500/80"
    >
      <Award className="h-4 w-4" aria-hidden="true" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em]">
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
      <h1 className={`mb-10 font-display text-5xl font-black uppercase leading-[0.8] tracking-tighter text-white sm:text-7xl md:text-9xl ${animationConfig.animation.className}`}>
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
  <p className="mx-auto mb-12 max-w-lg text-base font-medium leading-relaxed text-white/40 sm:text-lg md:text-xl lg:mx-0">
    {siteConfig.pages.home.hero.subtitle}
  </p>
);

interface CtaGroupProps {
  onQuoteClick: () => void;
}

const CtaGroup = ({ onQuoteClick }: CtaGroupProps) => (
  <div className="flex flex-col justify-center gap-6 sm:flex-row lg:justify-start">
    <Button
      className="rounded-2xl px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-white/5 transition-all"
      onClick={onQuoteClick}
      ariaLabel={siteConfig.pages.home.hero.ctaPrimary}
    >
      {siteConfig.pages.home.hero.ctaPrimary}
    </Button>

    <Button
      variant="outline"
      className="rounded-2xl border-white/10 px-12 py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:border-white hover:bg-white/5"
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
    className="relative flex items-center justify-center perspective-1000"
  >
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="group relative w-full max-w-[700px]"
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
    className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
  >
    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
      Scroll
    </span>
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      className="h-12 w-px bg-gradient-to-b from-white/20 via-white/40 to-transparent"
    />
  </motion.div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black pb-12 pt-24">
      <BackgroundFx />

      {/* Content grid */}
      <div className="relative z-10 mx-auto w-full max-w-7xl grid-cols-1 gap-20 px-6 lg:grid lg:grid-cols-2 lg:items-center">
        {/* Left column — copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left"
        >
          <BadgeRow />
          <Heading />
          <Subtitle />
          <CtaGroup onQuoteClick={() => setIsModalOpen(true)} />
        </motion.div>

        {/* Right column — image */}
        <ProductImage />
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