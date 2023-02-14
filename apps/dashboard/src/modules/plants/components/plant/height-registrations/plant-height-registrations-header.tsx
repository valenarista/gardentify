import React from 'react';

import PlantHeightRegistrationsManagement from './management/plant-height-registrations-management';

const PlantHeightRegistrationsHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      <h2 className="text-2xl font-bold">Height Registrations</h2>
      {/* Management */}
      <PlantHeightRegistrationsManagement />
    </div>
  );
};

export default PlantHeightRegistrationsHeader;
