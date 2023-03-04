import { useAuthContext } from '@modules/auth/context/auth-context';
import { __URL__ } from '@modules/common/lib/constants';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import ObjectQrCode from '@modules/qr-codes/components/object-qr-code';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

import ContainerDirtDepthAttribute from '../../cards/container-dirt-depth-attribute';
import ContainerTypeAttribute from '../../cards/container-type-attribute';
import UserContainerManagement from '../management/user-container-management';

const UserContainerDetails: React.FC = (props) => {
  const {} = props;
  const router = useRouter();
  const { state } = useAuthContext();
  const { container } = useUserContainerContext();

  return (
    <div className="flex w-full flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:flex-row md:space-x-4 md:space-y-0">
      {/* Details */}
      <div className="flex-1 flex-col">
        {/* Name */}
        <div className="flex items-center justify-between space-x-2 md:justify-start">
          <h1 className="mb-1 text-3xl font-bold">Container</h1>
          <ObjectQrCode urlToEncode={`${__URL__}${router.asPath}`} />
        </div>
        <div className="mb-1 flex space-x-4">
          {/* Type */}
          <ContainerTypeAttribute type={container.type} />
          {/* Dirt depth */}
          <ContainerDirtDepthAttribute dirtDepth={container.dirtDepth} />
        </div>
        {/* Joined at */}
        <p className="text-sm font-medium opacity-90">Created at {new Date(container.createdAt).toDateString()}</p>
      </div>
      {container.user && state.user && state.user.uuid === container.user.uuid ? <UserContainerManagement /> : null}
    </div>
  );
};

export default UserContainerDetails;
