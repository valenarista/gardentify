import { useFindContainerPlantsQuery } from '@modules/graphql/@generated/graphql';
import PlantsFeed from '@modules/plants/components/feed/plants-feed';
import React from 'react';

import UserContainerPlantsFeedHeader from './user-container-plants-feed-header';

type UserContainerPlantsFeedProps = {
  response: Pick<ReturnType<typeof useFindContainerPlantsQuery>, 'data' | 'error' | 'loading'>;
};

const UserContainerPlantsFeed: React.FC<UserContainerPlantsFeedProps> = (props) => {
  const { response } = props;
  const { data, error, loading } = response;

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-4">
        <UserContainerPlantsFeedHeader />

        {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : null}

        {data && data.findContainerPlants && data.findContainerPlants.plants ? (
          <PlantsFeed plants={data.findContainerPlants.plants} />
        ) : null}
      </div>
    </div>
  );
};

export default UserContainerPlantsFeed;
