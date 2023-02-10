import { User } from '@modules/graphql/@generated/graphql';
import React, { useEffect } from 'react';

import { useUserProfileContext } from '../context/user-profile-context';
import UserProfileDetails from './details/user-profile-details';

type UserProfileProps = {
  user: User;
};

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { user } = props;

  const { setUser } = useUserProfileContext();

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <div className="container flex max-w-4xl flex-col space-y-4">
      {/* Details */}
      <UserProfileDetails />
    </div>
  );
};

export default UserProfile;
