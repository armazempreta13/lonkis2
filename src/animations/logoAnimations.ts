/**
 * Logo Hover Animations
 * Centralized animations for the logo with easy configuration
 */

export const logoAnimations = {
  // 1. Glow Pulse - Elegant glow effect
  glowPulse: {
    name: 'glowPulse',
    css: `
      @keyframes glowPulse {
        0%, 100% {
          text-shadow: 0 0 10px rgba(0, 229, 160, 0.5), 0 0 20px rgba(0, 229, 160, 0.3);
          color: #ffffff;
        }
        50% {
          text-shadow: 0 0 20px rgba(0, 229, 160, 0.8), 0 0 40px rgba(0, 229, 160, 0.5);
          color: #00e5a0;
        }
      }
      .logo-glow-pulse:hover {
        animation: glowPulse 2s ease-in-out infinite;
      }
    `,
    className: 'logo-glow-pulse',
  },

  // 2. Split Letter Reveal - Futuristic vibration
  splitLetterReveal: {
    name: 'splitLetterReveal',
    css: `
      @keyframes letterVibrate {
        0%, 100% { transform: translateX(0) translateY(0); }
        25% { transform: translateX(1px) translateY(-1px); }
        50% { transform: translateX(-1px) translateY(1px); }
        75% { transform: translateX(1px) translateY(1px); }
      }
      .logo-split-reveal:hover {
        animation: letterVibrate 0.5s ease-in-out infinite;
      }
    `,
    className: 'logo-split-reveal',
  },

  // 3. Gradient Flow - Color gradient transition
  gradientFlow: {
    name: 'gradientFlow',
    css: `
      @keyframes gradientFlow {
        0% {
          background: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        50% {
          background: linear-gradient(90deg, #00e5a0 0%, #ffffff 50%, #00e5a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        100% {
          background: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
      .logo-gradient-flow:hover {
        animation: gradientFlow 1.5s ease-in-out;
      }
    `,
    className: 'logo-gradient-flow',
  },

  // 4. Letter Spacing Expand - Classic and effective
  letterSpaceExpand: {
    name: 'letterSpaceExpand',
    css: `
      @keyframes letterSpaceExpand {
        0% {
          letter-spacing: normal;
          color: #ffffff;
          transform: scale(1);
        }
        100% {
          letter-spacing: 2px;
          color: #00e5a0;
          transform: scale(1.03);
        }
      }
      .logo-letter-space:hover {
        animation: letterSpaceExpand 0.6s ease-out forwards;
      }
    `,
    className: 'logo-letter-space',
  },

  // 5. Underline Animated + Scale + Glow (RECOMMENDED)
  underlineAnimated: {
    name: 'underlineAnimated',
    css: `
      @keyframes underlineDraw {
        0% {
          width: 0;
          opacity: 0;
        }
        100% {
          width: 100%;
          opacity: 1;
        }
      }
      @keyframes glowBrighten {
        0% {
          text-shadow: none;
          color: #ffffff;
          transform: scale(1);
        }
        100% {
          text-shadow: 0 0 15px rgba(0, 229, 160, 0.6);
          color: #ffffff;
          transform: scale(1.03);
        }
      }
      .logo-underline-animated {
        position: relative;
        display: inline-block;
      }
      .logo-underline-animated::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, #00e5a0, #009e6e);
        transition: none;
      }
      .logo-underline-animated:hover::after {
        animation: underlineDraw 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
      }
      .logo-underline-animated:hover {
        animation: glowBrighten 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
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
