import { useFindPlantHeightRegistrationsQuery } from '@modules/graphql/@generated/graphql';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React from 'react';

import PlantHeightRegistrationsFeed from './feed/plant-height-registrations-feed';
import PlantHeightRegistrationsGrowth from './growth/plant-height-registrations-growth';

const PlantHeightRegistrations: React.FC = () => {
  const { plant } = useContainerPlantContext();
  const response = useFindPlantHeightRegistrationsQuery({
    variables: { input: { uuid: plant.uuid } },
    skip: plant.uuid === undefined,
  });

  return (
    <>
      <PlantHeightRegistrationsFeed
        response={{ data: response.data, error: response.error, loading: response.loading }}
      />
      <PlantHeightRegistrationsGrowth
        response={{ data: response.data, error: response.error, loading: response.loading }}
      />
    </>
  );
};

export default PlantHeightRegistrations;
