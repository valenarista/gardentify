import { NAVIGATION_LINKS } from '@modules/navigation/data/navigation-lib';
import ThemeToggler from '@modules/theme/components/theme-toggler';
import React from 'react';

import NavigationAuth from '../auth/navigation-auth';
import NavigationLink from '../navigation-link';
import NavigationLogo from '../navigation-logo';
import NavigationUserDetails from '../user-details/navigation-user-details';

const MobileNavigation: React.FC = () => {
  return (
    <div className="bg-primary-500 dark:bg-primary-900 fixed inset-x-0 bottom-0 z-10 h-[70px] p-3">
      <div className="flex items-center justify-between space-x-2">
        <NavigationLogo />

        {/* Links */}
        <nav className="flex grow items-center justify-center space-x-4">
          {NAVIGATION_LINKS.map((link) => {
            return <NavigationLink key={link.label} {...link} />;
          })}
          {/* Navigation Auth */}
          <NavigationAuth />
          {/*  Navigation User Details */}
          <NavigationUserDetails />
        </nav>

        <ThemeToggler isCompact />
      </div>
    </div>
  );
};

export default MobileNavigation;
