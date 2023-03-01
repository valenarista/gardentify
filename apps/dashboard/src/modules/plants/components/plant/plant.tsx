import { Plant as PlantType } from '@modules/graphql/@generated/graphql';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React, { useEffect } from 'react';

import PlantDetails from './details/plant-details';
import PlantHarvests from './harvests/plant-harvests';
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
    <section className="container mx-auto flex max-w-6xl flex-col space-y-4 md:px-4 lg:px-6">
      {/* Details */}
      <PlantDetails />
      {/* Height Registrations */}
      <PlantHeightRegistrations />
      {/* Harvests */}
      <PlantHarvests />
    </section>
  );
};

export default Plant;
