import { useFindPlantHeightRegistrationsQuery } from '@modules/graphql/@generated/graphql';
import HeightRegistrationsFeed from '@modules/height-registrations/components/feed/height-registrations-feed';
import React from 'react';

import PlantHeightRegistrationsHeader from '../plant-height-registrations-header';

type PlantHeightRegistrationsFeedProps = {
  response: Pick<ReturnType<typeof useFindPlantHeightRegistrationsQuery>, 'data' | 'error' | 'loading'>;
};

const PlantHeightRegistrationsFeed: React.FC<PlantHeightRegistrationsFeedProps> = (props) => {
  const { response } = props;
  const { data, error, loading } = response;

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-4">
        <PlantHeightRegistrationsHeader />

        {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : null}
        {data && data.findPlantHeightRegistrations && data.findPlantHeightRegistrations.heightRegistrations ? (
          <HeightRegistrationsFeed heightRegistrations={data.findPlantHeightRegistrations.heightRegistrations} />
        ) : null}
      </div>
    </div>
  );
};

export default PlantHeightRegistrationsFeed;
