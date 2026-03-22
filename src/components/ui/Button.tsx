import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  disabled?: boolean;
}

export const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', ariaLabel, disabled = false }: ButtonProps) => {
  const baseStyles = "px-8 py-4 font-display font-bold uppercase tracking-widest transition-all duration-300 text-sm md:text-base";
  const variants = {
    primary: "bg-brand-white text-brand-black hover:bg-brand-light-gray",
    outline: "bg-transparent text-brand-white border border-brand-white hover:bg-brand-white hover:text-brand-black"
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};
