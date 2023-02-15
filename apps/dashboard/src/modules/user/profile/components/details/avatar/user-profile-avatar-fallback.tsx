import React from 'react';

type UserProfileAvatarFallbackProps = {
  username: string;
};

const UserProfileAvatarFallback: React.FC<UserProfileAvatarFallbackProps> = (props) => {
  const { username } = props;
  return (
    <div className="flex h-32 items-center justify-center rounded-lg bg-neutral-100 object-cover object-center shadow-md dark:bg-neutral-900 md:h-36 md:w-36">
      <span className="text-primary-800 dark:text-primary-300 text-6xl font-bold">{username.at(0)}</span>
    </div>
  );
};

export default UserProfileAvatarFallback;
