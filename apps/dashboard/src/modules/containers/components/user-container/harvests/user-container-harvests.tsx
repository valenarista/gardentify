import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import { useFindContainerHarvestsQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import UserContainerHarvestsWeight from './weight/user-container-harvests-weight';

const UserContainerHarvests: React.FC = () => {
  const { container } = useUserContainerContext();
  const response = useFindContainerHarvestsQuery({
    variables: {
      input: {
        uuid: container.uuid,
      },
    },
    skip: container?.uuid === undefined,
  });

  return (
    <UserContainerHarvestsWeight response={{ data: response.data, loading: response.loading, error: response.error }} />
  );
};

export default UserContainerHarvests;
