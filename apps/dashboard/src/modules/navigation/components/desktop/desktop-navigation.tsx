import { NAVIGATION_LINKS } from '@modules/navigation/data/navigation-lib';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import React from 'react';

import NavigationAuth from '../auth/navigation-auth';
import NavigationLink from '../navigation-link';
import NavigationLogo from '../navigation-logo';
import NavigationUserDetails from '../user-details/navigation-user-details';

const DesktopNavigation: React.FC = () => {
  return (
    <aside className="h-screen">
      <div className="bg-primary-400 dark:bg-primary-800 float-left flex h-full flex-col space-y-4 rounded-r-lg p-4 shadow-lg">
        {/* Logo */}
        <NavigationLogo />
        {/* Links */}
        <nav className="flex grow flex-col space-y-2">
          {NAVIGATION_LINKS.map((link) => {
            return <NavigationLink key={link.label} {...link} />;
          })}
        </nav>
        {/* Theme Toggler */}
        <ThemeToggler />

        {/* User Details */}
        <NavigationUserDetails />
        {/* Auth */}
        <NavigationAuth />
      </div>
    </aside>
  );
};

export default DesktopNavigation;
