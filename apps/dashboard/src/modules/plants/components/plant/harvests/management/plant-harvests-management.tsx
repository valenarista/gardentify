import React from 'react';

import PlantHarvestsManagementCreate from './create/plant-harvests-management-create';

const PlantHarvestsManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <PlantHarvestsManagementCreate />
    </div>
  );
};
export default PlantHarvestsManagement;
