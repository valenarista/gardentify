import React from 'react';

import ContainerPlantManagementDelete from './delete/container-plant-management-delete';
import ContainerPlantManagementEdit from './edit/container-plant-management-edit';

const ContainerPlantManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <ContainerPlantManagementEdit />
      <ContainerPlantManagementDelete />
    </div>
  );
};
export default ContainerPlantManagement;
