import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { Differentials } from '../components/sections/Differentials';
import { Testimonials } from '../components/sections/Testimonials';
import { Location } from '../components/sections/Location';
import { CTASection } from '../components/sections/CTASection';
import { motion } from 'motion/react';

import { SEO } from '../components/ui/SEO';
import { siteConfig } from '../siteConfig';

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO />
      <Hero />
      <Services />
      <Differentials />
      <Testimonials />
      <Location />
      <CTASection />
    </motion.div>
  );
};
