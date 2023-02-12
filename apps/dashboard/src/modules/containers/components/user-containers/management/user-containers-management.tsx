import React from 'react';

import UserContainersManagementCreate from './create/user-containers-management-create';

const UserContainersManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <UserContainersManagementCreate />
    </div>
  );
};
export default UserContainersManagement;
