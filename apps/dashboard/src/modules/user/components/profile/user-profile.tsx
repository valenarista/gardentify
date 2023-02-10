import React from 'react';

import UserProfileDetails from './details/user-profile-details';

const UserProfile: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Details */}
      <UserProfileDetails />
    </div>
  );
};

export default UserProfile;
