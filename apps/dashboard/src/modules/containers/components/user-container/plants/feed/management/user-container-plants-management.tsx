import React from 'react';

import UserContainerPlantsManagementCreate from './create/user-container-plants-management-create';

const UserContainerPlantsManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <UserContainerPlantsManagementCreate />
    </div>
  );
};
export default UserContainerPlantsManagement;
