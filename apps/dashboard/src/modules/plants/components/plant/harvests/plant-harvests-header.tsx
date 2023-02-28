import { useAuthContext } from '@modules/auth/context/auth-context';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React from 'react';

import PlantHarvestsManagement from './management/plant-harvests-management';

const PlantHarvestsHeader: React.FC = () => {
  const { state } = useAuthContext();
  const { plant } = useContainerPlantContext();
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      <h2 className="text-2xl font-bold">Harvests</h2>
      {/* Management */}
      {state.user && plant.container?.user?.uuid && state.user.uuid === plant.container.user.uuid ? (
        <PlantHarvestsManagement />
      ) : null}
    </div>
  );
};

export default PlantHarvestsHeader;
