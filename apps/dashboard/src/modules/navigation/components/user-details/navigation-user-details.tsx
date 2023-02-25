import { useAuthContext } from '@modules/auth/context/auth-context';
import { useNavigationContext } from '@modules/navigation/context/navigation-context';
import clsx from 'clsx';
import React from 'react';

import NavigationUserDetailsLogout from './navigation-user-details-logout';
import NavigationUserDetailsProfile from './navigation-user-details-profile';

const NavigationUserDetails: React.FC = () => {
  const { state } = useAuthContext();
  const { isCompact } = useNavigationContext();

  if (!state.user) return null;

  return (
    <div className={clsx(isCompact ? 'flex space-x-4' : 'flex flex-col space-y-2')}>
      <NavigationUserDetailsProfile />
      <NavigationUserDetailsLogout />
    </div>
  );
};
export default NavigationUserDetails;
