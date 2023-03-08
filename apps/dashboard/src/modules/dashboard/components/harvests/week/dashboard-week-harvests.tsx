import { useAuthContext } from '@modules/auth/context/auth-context';
import { useFindWeekHarvestsQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import DashboardWeekHarvestsChart from './dashboard-week-harvests-chart';

const DashboardWeekHarvests: React.FC = () => {
  const { state } = useAuthContext();
  const { data, error, loading } = useFindWeekHarvestsQuery({
    variables: {
      input: {
        userUuid: state.user?.uuid!,
      },
    },
    skip: state.user === null,
  });

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">This week harvests</h3>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.findWeekHarvests && data.findWeekHarvests.harvests ? (
        <DashboardWeekHarvestsChart weekHarvests={data.findWeekHarvests.harvests} />
      ) : null}
    </div>
  );
};

export default DashboardWeekHarvests;
