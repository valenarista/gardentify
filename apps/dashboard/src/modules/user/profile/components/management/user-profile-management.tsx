import React from 'react';

import UserProfileManagementEdit from './edit/user-profile-management-edit';

const UserProfileManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <UserProfileManagementEdit />
    </div>
  );
};
export default UserProfileManagement;
