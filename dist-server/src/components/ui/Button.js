import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'motion/react';
export const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', ariaLabel }) => {
    const baseStyles = "px-8 py-4 font-display font-bold uppercase tracking-widest transition-all duration-300 text-sm md:text-base";
    const variants = {
        primary: "bg-brand-white text-brand-black hover:bg-brand-light-gray",
        outline: "bg-transparent text-brand-white border border-brand-white hover:bg-brand-white hover:text-brand-black"
    };
    return (_jsx(motion.button, { type: type, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: onClick, "aria-label": ariaLabel, className: `${baseStyles} ${variants[variant]} ${className}`, children: children }));
};
