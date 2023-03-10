import { useAuthContext } from '@modules/auth/context/auth-context';
import React from 'react';

import NavigationLink from '../navigation-link';

const NavigationUserDetailsProfile: React.FC = () => {
  const { userLoading, user } = useAuthContext();

  return (
    <NavigationLink
      href={user ? `/users/${user.uuid}` : '/'}
      label={!userLoading && user ? user.username : 'Loading'}
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
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      }
    />
  );
};
export default NavigationUserDetailsProfile;
