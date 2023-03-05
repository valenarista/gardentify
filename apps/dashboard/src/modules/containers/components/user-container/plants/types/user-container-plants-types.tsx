import { useFindContainerPlantsQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import UserContainerPlantsTypesChart from './user-container-plants-types-chart';

type UserContainerPlantsTypesProps = {
  response: Pick<ReturnType<typeof useFindContainerPlantsQuery>, 'data' | 'error' | 'loading'>;
};

const UserContainerPlantsTypes: React.FC<UserContainerPlantsTypesProps> = (props) => {
  const { response } = props;
  const { data, error, loading } = response;

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">Container Plants Types</h3>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}
      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.findContainerPlants && data.findContainerPlants.plants ? (
        <UserContainerPlantsTypesChart containerPlants={data.findContainerPlants.plants} />
      ) : null}
    </div>
  );
};

export default UserContainerPlantsTypes;
