import { useAuthContext } from '@modules/auth/context/auth-context';
import { __URL__ } from '@modules/common/lib/constants';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import ObjectQrCode from '@modules/qr-codes/components/object-qr-code';
import { useRouter } from 'next/router';
import React from 'react';

import ContainerPlantManagement from '../management/plant-management';

const PlantDetails: React.FC = (props) => {
  const {} = props;
  const router = useRouter();
  const { state } = useAuthContext();
  const { plant } = useContainerPlantContext();

  return (
    <div className="flex w-full flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:flex-row md:space-x-4 md:space-y-0">
      {/* Details */}
      <div className="flex-1 flex-col">
        {/* Name */}
        <div className="flex items-center justify-between space-x-2 md:justify-start">
          <h1 className="mb-1 text-3xl font-bold">Plant</h1>
          <ObjectQrCode urlToEncode={`${__URL__}${router.asPath}`} />
        </div>
        {/* Type */}
        <h2 className="font-medium">Type: {plant.type}</h2>
        {/* Dirt depth */}
        <h3 className="font-medium">Variety: {plant.variety}</h3>

        <p className="text-sm font-medium opacity-90">
          Seeds Planted at {new Date(plant.seedsPlantedAt).toDateString()}
        </p>
        <p className="text-sm font-medium opacity-90">
          Seeds Sprouted at {new Date(plant.seedsSproutedAt).toDateString()}
        </p>
        <p className="text-sm font-medium opacity-90">Created at {new Date(plant.createdAt).toDateString()}</p>
      </div>
      {plant?.container?.user?.uuid && state.user && state.user.uuid === plant.container.user.uuid ? (
        <ContainerPlantManagement />
      ) : null}
    </div>
  );
};

export default PlantDetails;
