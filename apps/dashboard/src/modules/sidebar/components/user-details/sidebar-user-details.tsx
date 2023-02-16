import { useAuthContext } from '@modules/auth/context/auth-context';
import React from 'react';

import SidebarUserDetailsLogout from './sidebar-user-details-logout';
import SidebarUserDetailsProfile from './sidebar-user-details-profile';

const SidebarUserDetails: React.FC = () => {
  const { state } = useAuthContext();

  if (!state.user) return null;

  return (
    <div className="flex flex-col space-y-2">
      <SidebarUserDetailsProfile />
      <SidebarUserDetailsLogout />
    </div>
  );
};
export default SidebarUserDetails;
