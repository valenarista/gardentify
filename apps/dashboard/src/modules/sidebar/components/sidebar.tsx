import ThemeToggler from '@modules/theme/components/theme-toggler';
import React from 'react';

import SidebarAuth from './auth/sidebar-auth';
import SidebarLink, { SidebarLinkProps } from './sidebar-link';
import SidebarLogo from './sidebar-logo';
import SidebarUserDetails from './user-details/sidebar-user-details';

const SIDEBAR_LINKS: SidebarLinkProps[] = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg
        className="h-5 w-5 stroke-black dark:stroke-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/containers',
    label: 'Containers',
    icon: (
      <svg
        className="h-5 w-5 stroke-black dark:stroke-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

const Sidebar: React.FC = () => {
  return (
    <div className="bg-primary-400 dark:bg-primary-800 float-left hidden h-screen w-60 flex-col space-y-4 rounded-r-lg p-4 shadow-lg md:flex">
      {/* Logo */}
      <SidebarLogo />
      {/* Links */}
      <nav className="flex grow flex-col space-y-2">
        {SIDEBAR_LINKS.map((link) => {
          return <SidebarLink key={link.label} {...link} />;
        })}
      </nav>
      {/* Theme Toggler */}
      <ThemeToggler />

      {/* User Details */}
      <SidebarUserDetails />
      {/* Auth */}
      <SidebarAuth />
    </div>
  );
};

export default Sidebar;
