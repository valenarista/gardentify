import React from 'react';

import { useUserProfileContext } from '../../context/user-profile-context';
import UserProfileManagement from '../management/user-profile-management';
import UserProfileAvatar from './user-profile-avatar';

const UserProfileDetails: React.FC = () => {
  const { user } = useUserProfileContext();

  return (
    <div className="flex w-full flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:flex-row md:space-x-4 md:space-y-0">
      {user.avatar ? <UserProfileAvatar oauthId={user.oauthId} avatar={user.avatar} /> : null}
      {/* Details */}
      <div className="flex-1 flex-col">
        {/* Name */}
        <h1 className="mb-1 text-3xl font-bold">{user.username}</h1>
        {/* Joined at */}
        <p className="text-sm font-medium opacity-90">Joined at {new Date(user.createdAt as Date).toDateString()}</p>
      </div>
      <UserProfileManagement />
    </div>
  );
};

export default UserProfileDetails;
