import Image from 'next/image';
import React from 'react';

type UserProfileAvatarProps = {
  avatar: string;
  oauthId: string;
};

const UserProfileAvatar: React.FC<UserProfileAvatarProps> = (props) => {
  const { avatar, oauthId } = props;

  const avatarSource = `https://cdn.discordapp.com/avatars/${oauthId}/${avatar}.png`;
  return (
    <div className="flex flex-col">
      <Image
        src={avatarSource}
        alt={'Avatar'}
        width={1000}
        height={1000}
        priority
        className="h-40 rounded-lg object-cover object-center shadow-md md:h-36 md:w-36"
      />
    </div>
  );
};

export default UserProfileAvatar;
