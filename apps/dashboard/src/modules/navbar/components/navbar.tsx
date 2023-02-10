import ThemeToggler from '@modules/theme/components/theme-toggler';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-primary-300 dark:bg-primary-800 w-full shadow-lg">
      <div className="container mx-auto flex h-[80px] w-full items-center justify-center px-4 md:max-w-7xl">
        {/* Logo */}
        <h1 className="text-2xl font-bold dark:text-white">Gardentify</h1>

        <nav className="ml-auto hidden items-center justify-center space-x-4 md:flex">
          <ThemeToggler />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
