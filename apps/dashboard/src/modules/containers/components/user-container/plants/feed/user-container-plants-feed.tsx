import { Button } from '@gardentify/ui';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import { useFindContainerPlantsQuery } from '@modules/graphql/@generated/graphql';
import PlantsFeed from '@modules/plants/components/feed/plants-feed';
import Link from 'next/link';
import React from 'react';

import UserContainerPlantsFeedHeader from './user-container-plants-feed-header';

type UserContainerPlantsFeedProps = {
  initialTake: number;
};

const UserContainerPlantsFeed: React.FC<UserContainerPlantsFeedProps> = (props) => {
  const { initialTake } = props;
  const { container } = useUserContainerContext();

  const response = useFindContainerPlantsQuery({
    variables: {
      input: {
        where: { uuid: container.uuid },
        take: initialTake,
      },
    },
    skip: container?.uuid === undefined,
  });

  const { data, error, loading } = response;

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-4">
        <UserContainerPlantsFeedHeader container={container} />

        {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : null}

        {data && data.findContainerPlants && data.findContainerPlants.plants ? (
          <PlantsFeed plants={data.findContainerPlants.plants} />
        ) : null}

        <Link href={`/containers/${container.uuid}/plants`}>
          <Button variant="ghost" colorScheme="secondary" className="w-full">
            See More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserContainerPlantsFeed;
