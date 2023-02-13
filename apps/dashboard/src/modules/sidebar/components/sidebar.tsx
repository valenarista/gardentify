import ThemeToggler from '@modules/theme/components/theme-toggler';
import React from 'react';

import SidebarLink, { SidebarLinkProps } from './sidebar-link';
import SidebarUserDetails from './sidebar-user-details';

const SIDEBAR_LINKS: SidebarLinkProps[] = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg
        className="h-5 w-5 stroke-black dark:stroke-white"
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
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
        width="50px"
        height="50px"
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
];

const Sidebar: React.FC = () => {
  return (
    <div className="bg-primary-400 dark:bg-primary-800 float-left hidden h-screen w-60 flex-col space-y-4 rounded-r-lg p-4 shadow-lg md:flex">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-2">
        <span className="text-dark text-3xl font-bold dark:text-white">Gardentify</span>
      </div>

      {/* Links */}
      <nav className="flex grow flex-col space-y-2">
        {SIDEBAR_LINKS.map((link) => {
          return <SidebarLink key={link.label} {...link} />;
        })}
      </nav>

      <SidebarUserDetails />
      <ThemeToggler />
    </div>
  );
};

export default Sidebar;
