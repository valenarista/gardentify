import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import { useFindContainerPlantsQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import UserContainerPlantsFeed from './feed/user-container-plants-feed';
import UserContainerPlantsTypes from './types/user-container-plants-types';

const UserContainerPlants: React.FC = () => {
  const { container } = useUserContainerContext();
  const response = useFindContainerPlantsQuery({
    variables: {
      input: {
        uuid: container.uuid,
      },
    },
    skip: container?.uuid === undefined,
  });

  return (
    <>
      <UserContainerPlantsFeed response={{ data: response.data, loading: response.loading, error: response.error }} />
      <UserContainerPlantsTypes response={{ data: response.data, loading: response.loading, error: response.error }} />
    </>
  );
};

export default UserContainerPlants;
