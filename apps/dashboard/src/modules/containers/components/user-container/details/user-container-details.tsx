import { useAuthContext } from '@modules/auth/context/auth-context';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import React from 'react';

import UserContainerManagement from '../management/user-container-management';

const UserContainerDetails: React.FC = (props) => {
  const {} = props;
  const { state } = useAuthContext();
  const { container } = useUserContainerContext();

  return (
    <div className="flex w-full flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:flex-row md:space-x-4 md:space-y-0">
      {/* Details */}
      <div className="flex-1 flex-col">
        {/* Name */}
        <h1 className="mb-1 text-3xl font-bold">Container</h1>
        {/* Type */}
        <h2 className="font-medium">Type: {container.type}</h2>
        {/* Dirt depth */}
        <h3 className="font-medium">Dirt Depth: {container.dirtDepth} cms</h3>
        {/* Joined at */}
        <p className="text-sm font-medium opacity-90">Created at {new Date(container.createdAt).toDateString()}</p>
      </div>
      {container.user && state.user && state.user.uuid === container.user.uuid ? <UserContainerManagement /> : null}
    </div>
  );
};

export default UserContainerDetails;
