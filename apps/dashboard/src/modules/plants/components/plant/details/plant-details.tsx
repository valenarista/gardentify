import { useAuthContext } from '@modules/auth/context/auth-context';
import { __URL__ } from '@modules/common/lib/constants';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import ObjectQrCode from '@modules/qr-codes/components/object-qr-code';
import { useRouter } from 'next/router';
import React from 'react';

import PlantTypeAttribute from '../../cards/plant-type-attribute';
import PlantVarietyAttribute from '../../cards/plant-variety-attribute';
import ContainerPlantManagement from '../management/plant-management';

const PlantDetails: React.FC = (props) => {
  const {} = props;
  const router = useRouter();
  const { user } = useAuthContext();
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
        <div className="mb-1 flex space-x-4">
          {/* Type */}
          <PlantTypeAttribute type={plant.type} />
          {/* Dirt depth */}
          <PlantVarietyAttribute variety={plant.variety} />
        </div>
        <p className="text-sm font-medium opacity-90">
          Seeds Planted at {new Date(plant.seedsPlantedAt).toDateString()}
        </p>
        <p className="text-sm font-medium opacity-90">
          Seeds Sprouted at {new Date(plant.seedsSproutedAt).toDateString()}
        </p>
        <p className="text-sm font-medium opacity-90">Created at {new Date(plant.createdAt).toDateString()}</p>
      </div>
      {user && plant.container && plant.container.user && plant.container.user.uuid === user.uuid ? (
        <ContainerPlantManagement />
      ) : null}
    </div>
  );
};

export default PlantDetails;
