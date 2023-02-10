import Navbar from '@modules/navbar/components/navbar';
import type { ReactNode } from 'react';
import React from 'react';

import LayoutHead from './layout-head';

type LayoutProps = {
  children: ReactNode;
  /** Optional: head props used for seo data. */
  headProps?: React.ComponentPropsWithoutRef<typeof LayoutHead>;
};

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, headProps } = props;

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* HEAD */}
      <LayoutHead {...headProps} />

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col items-center bg-neutral-50 py-4 dark:bg-neutral-900 md:py-6 lg:py-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;