import Navigation from '@modules/navigation/components/navigation';
import NavigationProvider from '@modules/navigation/context/navigation-context';
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
    <div className="flex min-h-screen flex-row overflow-hidden bg-neutral-100 dark:bg-neutral-900">
      {/* Header */}
      <LayoutHead {...headProps} />
      {/* Navigation */}
      <NavigationProvider>
        <Navigation />
      </NavigationProvider>
      {/* Content */}
      <div className="flex flex-1 flex-col items-center py-4 px-2.5 md:px-0 md:py-6 lg:py-10">{children}</div>
    </div>
  );
};

export default Layout;
