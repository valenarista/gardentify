import { Skeleton } from '@gardentify/ui';
import Image from 'next/image';
import React from 'react';

import { useUserProfileContext } from '../../context/user-profile-context';

const UserProfileAvatar: React.FC = () => {
  const { user } = useUserProfileContext();

  return (
    <div className="flex flex-col">
      <Skeleton loading={false}>
        {user?.uuid ? (
          <Image
            src={`https://cdn.discordapp.com/avatars/${user?.oauthId}/${user?.avatar}.png`}
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
