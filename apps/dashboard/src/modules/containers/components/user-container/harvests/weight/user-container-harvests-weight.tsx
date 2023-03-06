import { useFindContainerHarvestsQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import UserContainerHarvestsWeightChart from './user-container-harvests-weight-chart';

type UserContainerHarvestsWeightProps = {
  response: Pick<ReturnType<typeof useFindContainerHarvestsQuery>, 'data' | 'error' | 'loading'>;
};

const UserContainerHarvestsWeight: React.FC<UserContainerHarvestsWeightProps> = (props) => {
  const { response } = props;
  const { data, error, loading } = response;

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">Container Harvests</h3>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.findContainerHarvests && data.findContainerHarvests.harvests ? (
        <UserContainerHarvestsWeightChart harvests={data.findContainerHarvests.harvests} />
      ) : null}
    </div>
  );
};

export default UserContainerHarvestsWeight;
