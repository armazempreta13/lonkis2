/**
 * Logo Hover Animations - Refined & Subtle
 * Smooth, elegant animations with fade transitions
 */

export const logoAnimations = {
  // 1. Glow Pulse - Subtle, elegant glow
  glowPulse: {
    name: 'glowPulse',
    css: `
      @keyframes glowPulseSubtle {
        0%, 100% {
          text-shadow: 0 0 5px rgba(0, 229, 160, 0.2);
          color: #ffffff;
        }
        50% {
          text-shadow: 0 0 12px rgba(0, 229, 160, 0.4);
          color: #ffffff;
        }
      }
      .logo-glow-pulse {
        transition: all 0.3s ease-in-out;
      }
      .logo-glow-pulse:hover {
        animation: glowPulseSubtle 2.5s ease-in-out infinite;
      }
    `,
    className: 'logo-glow-pulse',
  },

  // 2. Split Letter Reveal - Gentle micro-vibration
  splitLetterReveal: {
    name: 'splitLetterReveal',
    css: `
      @keyframes letterTremolo {
        0%, 100% { transform: translateX(0) translateY(0); opacity: 1; }
        50% { transform: translateX(0.3px) translateY(-0.3px); opacity: 0.95; }
      }
      .logo-split-reveal {
        transition: opacity 0.3s ease-in-out;
      }
      .logo-split-reveal:hover {
        animation: letterTremolo 1.2s ease-in-out infinite;
      }
    `,
    className: 'logo-split-reveal',
  },

  // 3. Gradient Flow - Subtle color shift
  gradientFlow: {
    name: 'gradientFlow',
    css: `
      @keyframes subtleGradient {
        0%, 100% {
          color: #ffffff;
          opacity: 1;
        }
        50% {
          color: #00e5a0;
          opacity: 0.95;
        }
      }
      .logo-gradient-flow {
        transition: all 0.4s ease-in-out;
      }
      .logo-gradient-flow:hover {
        animation: subtleGradient 2s ease-in-out forwards;
      }
    `,
    className: 'logo-gradient-flow',
  },

  // 4. Letter Spacing Expand - Minimal, refined
  letterSpaceExpand: {
    name: 'letterSpaceExpand',
    css: `
      @keyframes gentleExpand {
        0% {
          letter-spacing: normal;
          color: #ffffff;
          transform: scale(1);
          opacity: 1;
        }
        100% {
          letter-spacing: 0.8px;
          color: #ffffff;
          transform: scale(1.01);
          opacity: 0.95;
        }
      }
      .logo-letter-space {
        transition: all 0.3s ease-in-out;
      }
      .logo-letter-space:hover {
        animation: gentleExpand 0.8s ease-out forwards;
      }
    `,
    className: 'logo-letter-space',
  },

  // 5. Underline Animated + Subtle Glow (RECOMMENDED)
  underlineAnimated: {
    name: 'underlineAnimated',
    css: `
      @keyframes underlineDrawSubtle {
        0% {
          width: 0;
          opacity: 0;
        }
        100% {
          width: 100%;
          opacity: 0.8;
        }
      }
      @keyframes subtleGlowBrighten {
        0% {
          text-shadow: none;
          color: #ffffff;
          transform: scale(1);
          opacity: 1;
        }
        100% {
          text-shadow: 0 0 8px rgba(0, 229, 160, 0.3);
          color: #ffffff;
          transform: scale(1.01);
          opacity: 0.98;
        }
      }
      .logo-underline-animated {
        position: relative;
        display: inline-block;
        transition: all 0.3s ease-in-out;
      }
      .logo-underline-animated::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        height: 1.5px;
        background: linear-gradient(90deg, #00e5a0, #009e6e);
        transition: all 0.3s ease-in-out;
        opacity: 0;
      }
      .logo-underline-animated:hover::after {
        animation: underlineDrawSubtle 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
      }
      .logo-underline-animated:hover {
        animation: subtleGlowBrighten 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
      }
    `,
    className: 'logo-underline-animated',
  },
};

// Default animation
export const defaultLogoAnimation = 'underlineAnimated';

// Get animation config by name
export const getLogoAnimation = (name: string = defaultLogoAnimation) => {
  return (logoAnimations as Record<string, any>)[name] || logoAnimations.underlineAnimated;
};
