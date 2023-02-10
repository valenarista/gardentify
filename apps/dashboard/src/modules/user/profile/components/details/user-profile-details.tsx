import React from 'react';

import { useUserProfileContext } from '../../context/user-profile-context';

const UserProfileDetails: React.FC = (props) => {
  const {} = props;
  const { user } = useUserProfileContext();

  return (
    <div className="flex flex-row rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <div className="flex w-full flex-row items-start drop-shadow-2xl">
        {/* Details */}
        <div className="flex flex-col">
          {/* Name */}
          <h1 className="text-3xl font-bold">{user.email}</h1>
          {/* Joined at */}
          <p className="text-sm font-medium">Joined at {new Date(user.createdAt as Date).toDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
