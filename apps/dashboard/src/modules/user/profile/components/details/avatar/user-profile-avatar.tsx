import { useUserProfileContext } from '@modules/user/profile/context/user-profile-context';
import React from 'react';

const UserProfileAvatar: React.FC = () => {
  const { user } = useUserProfileContext();

  return (
    <div className="flex flex-col">
      <div className="flex h-32 items-center justify-center rounded-lg bg-neutral-100 object-cover object-center shadow-md dark:bg-neutral-900 md:h-36 md:w-36">
        {user.username ? (
          <span className="text-primary-800 dark:text-primary-300 text-6xl font-bold">{user.username.at(0)}</span>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfileAvatar;
