import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  FindPlantHarvestsDocument,
  FindPlantHarvestsQuery,
  FindPlantHarvestsQueryVariables,
} from '@modules/graphql/@generated/graphql';
import HarvestsFeed from '@modules/harvests/components/feed/harvests-feed';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React from 'react';

import PlantHarvestsHeader from './plant-harvests-header';

const PlantHarvests: React.FC = () => {
  const { plant } = useContainerPlantContext();
  const { response, loading } = useApiQuery<FindPlantHarvestsQuery, FindPlantHarvestsQueryVariables>(
    FindPlantHarvestsDocument,
    {
      variables: { input: { where: { uuid: plant.uuid }, take: 6 } },
      skip: plant.uuid === undefined,
    }
  );

  const harvests = response?.data?.findPlantHarvests.harvests || [];

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-4">
        <PlantHarvestsHeader />

        {response && response.error && response.error ? (
          <span className="text-neutral-800 dark:text-neutral-100">{response.error.message}</span>
        ) : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : harvests.length ? (
          <HarvestsFeed harvests={harvests} includePlantDetails />
        ) : null}
      </div>
    </div>
  );
};

export default PlantHarvests;
