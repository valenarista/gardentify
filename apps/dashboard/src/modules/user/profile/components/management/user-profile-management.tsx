import React from 'react';

import UserProfileManagementEdit from './edit/user-profile-management-edit';
import UserProfileManagement2FA from './two-factor/user-profile-management-2fa';

const UserProfileManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <UserProfileManagementEdit />
      <UserProfileManagement2FA />
    </div>
  );
};
export default UserProfileManagement;
