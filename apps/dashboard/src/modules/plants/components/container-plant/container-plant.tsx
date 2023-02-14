import { Plant } from '@modules/graphql/@generated/graphql';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React, { useEffect } from 'react';

import ContainerPlantDetails from './details/container-plant-details';
import ContainerPlantHeightRegistrations from './height-registrations/container-plant-height-registrations';

type ContainerPlantProps = {
  plant: Plant;
};

const ContainerPlant: React.FC<ContainerPlantProps> = (props) => {
  const { plant } = props;

  const { setPlant } = useContainerPlantContext();

  useEffect(() => {
    setPlant(plant);
  }, [plant]);

  return (
    <div className="container mx-auto flex max-w-6xl flex-col space-y-4 px-2 md:px-4 lg:px-6">
      {/* Details */}
      <ContainerPlantDetails />
      {/* Height Registrations */}
      <ContainerPlantHeightRegistrations />
    </div>
  );
};

export default ContainerPlant;
