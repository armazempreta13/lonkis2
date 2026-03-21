import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Hero } from '../components/sections/Hero';
import { Services } from '../components/sections/Services';
import { Differentials } from '../components/sections/Differentials';
import { Testimonials } from '../components/sections/Testimonials';
import { Location } from '../components/sections/Location';
import { CTASection } from '../components/sections/CTASection';
import { motion } from 'motion/react';
import { SEO } from '../components/ui/SEO';
export const Home = () => {
    return (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.5 }, children: [_jsx(SEO, {}), _jsx(Hero, {}), _jsx(Services, {}), _jsx(Differentials, {}), _jsx(Testimonials, {}), _jsx(Location, {}), _jsx(CTASection, {})] }));
};
