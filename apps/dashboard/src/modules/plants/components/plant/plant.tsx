import { Plant as PlantType } from '@modules/graphql/@generated/graphql';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React, { useEffect } from 'react';

import PlantDetails from './details/plant-details';
import PlantHeightRegistrations from './height-registrations/plant-height-registrations';

type PlantProps = {
  plant: PlantType;
};

const Plant: React.FC<PlantProps> = (props) => {
  const { plant } = props;

  const { setPlant } = useContainerPlantContext();

  useEffect(() => {
    setPlant(plant);
  }, [plant]);

  return (
    <div className="container mx-auto flex max-w-6xl flex-col space-y-4 px-2 md:px-4 lg:px-6">
      {/* Details */}
      <PlantDetails />
      {/* Height Registrations */}
      <PlantHeightRegistrations />
    </div>
  );
};

export default Plant;
