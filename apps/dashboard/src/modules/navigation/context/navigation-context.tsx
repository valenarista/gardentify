import useMediaQuery from '@modules/common/hooks/use-media-query';
import { createContext, useContext, useEffect, useState } from 'react';

type NavigationContextState = {
  isCompact: boolean;
};

const initialState: NavigationContextState = {
  isCompact: false,
};

const NavigationContext = createContext<NavigationContextState>(initialState);

/**
 * Hook for accessing the theme context.
 * @returns The theme context.
 */
export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('Tried to use NavigationContext with no context avaiable!');
  return context;
};

type NavigationProviderProps = {
  children: React.ReactNode;
};

const NavigationProvider: React.FC<NavigationProviderProps> = (props) => {
  const { children } = props;
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const [compact, setCompact] = useState<boolean>(isSmallDevice);

  useEffect(() => {
    setCompact(isSmallDevice);
  }, [isSmallDevice]);

  return <NavigationContext.Provider value={{ isCompact: compact }}>{children}</NavigationContext.Provider>;
};

export default NavigationProvider;
