import React from 'react';

import UserContainerManagementDelete from './delete/user-container-management-delete';
import UserContainerManagementEdit from './edit/user-container-management-edit';

const UserContainerManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <UserContainerManagementEdit />
      <UserContainerManagementDelete />
    </div>
  );
};
export default UserContainerManagement;
