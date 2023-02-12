import Sidebar from '@modules/sidebar/components/sidebar';
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
    <div className="flex min-h-screen flex-row overflow-hidden bg-neutral-50 dark:bg-neutral-900">
      {/* HEAD */}
      <LayoutHead {...headProps} />

      {/* NAVBAR */}
      {/* <Navbar /> */}
      <Sidebar />
      {/* CONTENT */}
      <div className="flex flex-1 flex-col items-center py-4 md:py-6 lg:py-10">{children}</div>
    </div>
  );
};

export default Layout;
