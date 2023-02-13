import React from 'react';

import UserContainersManagement from './management/user-containers-management';

type UserContainersHeaderProps = {
  username: string;
};

const UserContainersHeader: React.FC<UserContainersHeaderProps> = (props) => {
  const { username } = props;

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      <h2 className="text-2xl font-bold">{username}&apos;s Containers</h2>
      {/* Management */}
      <UserContainersManagement />
    </div>
  );
};

export default UserContainersHeader;
