import React from 'react';

import UserContainerPlantsManagementCreate from './management/create/user-container-plants-management-create';

const UserContainerPlantsHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      <h2 className="text-2xl font-bold">Container Plants</h2>
      {/* Management */}
      <UserContainerPlantsManagementCreate />
    </div>
  );
};

export default UserContainerPlantsHeader;
