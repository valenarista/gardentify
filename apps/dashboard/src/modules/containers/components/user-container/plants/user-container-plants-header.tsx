import { useAuthContext } from '@modules/auth/context/auth-context';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import React from 'react';

import UserContainerPlantsManagementCreate from './management/create/user-container-plants-management-create';

const UserContainerPlantsHeader: React.FC = () => {
  const { state } = useAuthContext();
  const { container } = useUserContainerContext();

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      <h2 className="text-2xl font-bold">Container Plants</h2>
      {/* Management */}
      {container.user && state.user && state.user.uuid === container.user.uuid ? (
        <UserContainerPlantsManagementCreate />
      ) : null}
    </div>
  );
};

export default UserContainerPlantsHeader;
