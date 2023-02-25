import React from 'react';

import { useNavigationContext } from '../context/navigation-context';
import DesktopNavigation from './desktop/desktop-navigation';
import MobileNavigation from './mobile/mobile-navigation';

export type NavigationLink = {
  href: string;
  label: string;
  icon: React.ReactElement;
};

const Navigation: React.FC = () => {
  const { isCompact } = useNavigationContext();

  if (isCompact) return <MobileNavigation />;

  return <DesktopNavigation />;
};

export default Navigation;
