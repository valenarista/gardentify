import { Skeleton } from '@gardentify/ui';
import { useUserProfileContext } from '@modules/user/profile/context/user-profile-context';
import Image from 'next/image';
import React from 'react';

import UserProfileAvatarFallback from './user-profile-avatar-fallback';

const UserProfileAvatar: React.FC = () => {
  const { user } = useUserProfileContext();

  const shouldFallback = user.avatar === null || user.oauthId === null;

  if (shouldFallback) return <UserProfileAvatarFallback username={user.username} />;

  return (
    <div className="flex flex-col">
      <Skeleton loading={false}>
        {user.oauthId && user.avatar ? (
          <Image
            src={`https://cdn.discordapp.com/avatars/${user.oauthId}/${user.avatar}.png`}
            alt={'Avatar'}
            width={800}
            height={800}
            loading="lazy"
            className="h-40 rounded-lg object-cover object-center shadow-md md:h-36 md:w-36"
          />
        ) : null}
      </Skeleton>
    </div>
  );
};

export default UserProfileAvatar;
