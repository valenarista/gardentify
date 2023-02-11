import { Button } from '@gardentify/ui';
import React from 'react';

import { useUserProfileEditContext } from '../../context/edit/user-profile-edit-context';
import { useUserProfileContext } from '../../context/user-profile-context';

const UserProfileDetails: React.FC = (props) => {
  const {} = props;
  const { user } = useUserProfileContext();
  const { setIsModalOpen } = useUserProfileEditContext();

  return (
    <div className="flex flex-row rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <div className="flex w-full flex-row items-start justify-between drop-shadow-2xl">
        {/* Details */}
        <div className="flex flex-col">
          {/* Name */}
          <h1 className="mb-1 text-3xl font-bold">{user.username}</h1>
          {/* Joined at */}
          <p className="text-sm font-medium opacity-90">Joined at {new Date(user.createdAt as Date).toDateString()}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
