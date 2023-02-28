import { useAuthContext } from '@modules/auth/context/auth-context';
import React from 'react';

import DesktopNavigationLink from '../navigation-link';

const NavigationAuth: React.FC = () => {
  const { state } = useAuthContext();

  if (state.user) return null;

  return (
    <div className="flex flex-col space-y-2">
      <DesktopNavigationLink
        href="/auth"
        label="Auth"
        icon={
          <svg
            className="h-5 w-5 stroke-black dark:stroke-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        }
      />
    </div>
  );
};
export default NavigationAuth;
