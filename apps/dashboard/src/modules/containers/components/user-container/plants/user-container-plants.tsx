import useApiQuery from '@modules/common/hooks/use-api-query';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import {
  FindContainerPlantsDocument,
  FindContainerPlantsQuery,
  FindContainerPlantsQueryVariables,
  Plant,
} from '@modules/graphql/@generated/graphql';
import PlantsFeed from '@modules/plants/components/feed/plants-feed';
import React from 'react';

import UserContainerPlantsHeader from './user-container-plants-header';

const UserContainerPlants: React.FC = (props) => {
  const {} = props;
  const { container } = useUserContainerContext();
  const { response, loading } = useApiQuery<FindContainerPlantsQuery, FindContainerPlantsQueryVariables>(
    FindContainerPlantsDocument,
    {
      variables: {
        input: {
          uuid: container.uuid,
        },
      },
      skip: container?.uuid === undefined,
    }
  );

  const plants: Plant[] = response?.data?.findContainerPlants.plants || [];

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-2">
        <UserContainerPlantsHeader />

        {response?.error ? (
          <span className="text-neutral-800 dark:text-neutral-100">{response.error.message}</span>
        ) : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : (
          <PlantsFeed plants={plants} />
        )}
      </div>
    </div>
  );
};

export default UserContainerPlants;
