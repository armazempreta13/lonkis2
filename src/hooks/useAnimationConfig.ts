import { useEffect, useState } from 'react';
import { siteConfig } from '../siteConfig';
import { getLogoAnimation } from '../animations/logoAnimations';

/**
 * Hook customizado para garantir que mudanças na configuração de animações
 * do siteConfig sejam sempre refletidas em tempo real no componente
 */
export const useAnimationConfig = () => {
  const [animationConfig, setAnimationConfig] = useState(() => ({
    name: siteConfig.animations?.logoHover || 'underlineAnimated',
    animation: getLogoAnimation(siteConfig.animations?.logoHover),
  }));

  useEffect(() => {
    // Atualiza o estado sempre que o siteConfig for recarregado
    const currentAnimationName = siteConfig.animations?.logoHover || 'underlineAnimated';
    
    setAnimationConfig({
      name: currentAnimationName,
      animation: getLogoAnimation(currentAnimationName),
    });

    // Se em dev mode, detecta mudanças via hot reload
    if (import.meta.hot) {
      const handleHotUpdate = () => {
        const newAnimationName = siteConfig.animations?.logoHover || 'underlineAnimated';
        setAnimationConfig({
          name: newAnimationName,
          animation: getLogoAnimation(newAnimationName),
        });
      };

      // Re-subscrive a mudanças
      import.meta.hot.on('full-reload', handleHotUpdate);
    }
  }, []);

  return animationConfig;
};
