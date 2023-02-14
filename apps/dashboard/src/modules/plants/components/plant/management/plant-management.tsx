import React from 'react';

import PlantManagementDelete from './delete/plant-management-delete';
import PlantManagementEdit from './edit/plant-management-edit';

const PlantManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <PlantManagementEdit />
      <PlantManagementDelete />
    </div>
  );
};
export default PlantManagement;
