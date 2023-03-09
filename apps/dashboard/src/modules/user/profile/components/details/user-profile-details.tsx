import { Skeleton } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import React from 'react';

import { useUserProfileContext } from '../../context/user-profile-context';
import UserProfileManagement from '../management/user-profile-management';
import UserProfileAvatar from './avatar/user-profile-avatar';
import UserProfileDetailsTwoFactor from './two-factor/user-profile-details-two-factor';

const UserProfileDetails: React.FC = () => {
  const { state } = useAuthContext();
  const { user } = useUserProfileContext();

  return (
    <div className="flex w-full flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:flex-row md:space-x-4 md:space-y-0">
      <UserProfileAvatar />
      {/* Details */}
      <div className="flex-1 flex-col">
        {/* Name */}
        <Skeleton loading={false}>
          <h1 className="mb-1 text-3xl font-bold">{user.username}</h1>
        </Skeleton>
        {/* 2FA */}
        {state.user && state.user.uuid === user.uuid ? (
          <UserProfileDetailsTwoFactor twoFactorEnabled={user.twoFactorEnabled} />
        ) : null}
        {/* Joined at */}
        <Skeleton loading={false}>
          <p className="mt-1.5 text-sm font-medium opacity-90">Joined at {new Date(user.createdAt).toDateString()}</p>
        </Skeleton>
      </div>
      {user && user.uuid && state.user && state.user.uuid === user.uuid ? <UserProfileManagement /> : null}
    </div>
  );
};

export default UserProfileDetails;
