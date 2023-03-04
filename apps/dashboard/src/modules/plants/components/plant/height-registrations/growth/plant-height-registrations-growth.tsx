import { useFindPlantHeightRegistrationsQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import PlantHeightRegistrationsGrowthChart from './plant-height-registrations-growth-chart';

type PlantHeightRegistrationsGrowthProps = {
  response: Pick<ReturnType<typeof useFindPlantHeightRegistrationsQuery>, 'data' | 'error' | 'loading'>;
};

const PlantHeightRegistrationsGrowth: React.FC<PlantHeightRegistrationsGrowthProps> = (props) => {
  const { response } = props;
  const { data, error, loading } = response;

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">Plant Growth</h3>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.findPlantHeightRegistrations && data.findPlantHeightRegistrations.heightRegistrations ? (
        <PlantHeightRegistrationsGrowthChart
          heightRegistrations={data.findPlantHeightRegistrations.heightRegistrations}
        />
      ) : null}
    </div>
  );
};

export default PlantHeightRegistrationsGrowth;
