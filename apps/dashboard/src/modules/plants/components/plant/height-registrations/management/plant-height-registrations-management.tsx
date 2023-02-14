import React from 'react';

import PlantHeightRegistrationsManagementCreate from './create/plant-height-registrations-management-create';

const PlantHeightRegistrationsManagement: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <PlantHeightRegistrationsManagementCreate />
    </div>
  );
};
export default PlantHeightRegistrationsManagement;
