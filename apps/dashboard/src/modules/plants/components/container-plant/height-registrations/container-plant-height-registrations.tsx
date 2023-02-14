import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  FindPlantHeightRegistrationsDocument,
  FindPlantHeightRegistrationsQuery,
  FindPlantHeightRegistrationsQueryVariables,
} from '@modules/graphql/@generated/graphql';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React from 'react';

const ContainerPlantHeightRegistrations: React.FC = () => {
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
      <div className="flex w-full flex-col space-y-2">
        <h2 className="text-2xl font-bold">Height Registrations</h2>

        {response?.error ? (
          <span className="text-neutral-800 dark:text-neutral-100">{response.error.message}</span>
        ) : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : heightRegistrations.length ? (
          heightRegistrations.map((heightRegistration, index) => {
            return <div key={index}></div>;
          })
        ) : null}
      </div>
    </div>
  );
};

export default ContainerPlantHeightRegistrations;
