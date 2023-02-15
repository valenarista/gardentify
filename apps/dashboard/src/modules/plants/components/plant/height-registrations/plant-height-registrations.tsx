import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  FindPlantHeightRegistrationsDocument,
  FindPlantHeightRegistrationsQuery,
  FindPlantHeightRegistrationsQueryVariables,
} from '@modules/graphql/@generated/graphql';
import HeightRegistrationsFeed from '@modules/height-registrations/components/feed/height-registrations-feed';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React from 'react';

import PlantHeightRegistrationsHeader from './plant-height-registrations-header';

const PlantHeightRegistrations: React.FC = () => {
  const { plant } = useContainerPlantContext();
  const { response, loading } = useApiQuery<
    FindPlantHeightRegistrationsQuery,
    FindPlantHeightRegistrationsQueryVariables
  >(FindPlantHeightRegistrationsDocument, {
    variables: { input: { uuid: plant.uuid } },
    skip: plant.uuid === undefined,
  });

  const heightRegistrations = response?.data?.findPlantHeightRegistrations.heightRegistrations || [];

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-4">
        <PlantHeightRegistrationsHeader />

        {response?.error ? (
          <span className="text-neutral-800 dark:text-neutral-100">{response.error.message}</span>
        ) : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : heightRegistrations.length ? (
          <HeightRegistrationsFeed heightRegistrations={heightRegistrations} />
        ) : null}
      </div>
    </div>
  );
};

export default PlantHeightRegistrations;
