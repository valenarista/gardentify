import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import React from 'react';

const UserContainerDetails: React.FC = (props) => {
  const {} = props;
  const { container } = useUserContainerContext();

  return (
    <div className="flex flex-row rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <div className="flex w-full flex-row items-start justify-between drop-shadow-2xl">
        {/* Details */}
        <div className="flex flex-col">
          {/* Name */}
          <h1 className="mb-1 text-3xl font-bold">Container</h1>
          {/* Type */}
          <h2 className="font-medium">Type: {container.type}</h2>
          <h3 className="font-medium">Dirt Depth: {container.dirtDepth} cms</h3>
          {/* Joined at */}
          <p className="text-sm font-medium opacity-90">
            Created at {new Date(container.createdAt as Date).toDateString()}
          </p>
        </div>
        <div className="flex flex-col space-y-2"></div>
      </div>
    </div>
  );
};

export default UserContainerDetails;
