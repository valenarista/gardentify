import { Button } from '@gardentify/ui';
import useFilter, { Filter, Sort } from '@modules/common/hooks/use-filter';
import { Container, Plant, useFindContainerPlantsQuery } from '@modules/graphql/@generated/graphql';
import PlantsFeed from '@modules/plants/components/feed/plants-feed';
import React, { useEffect, useState } from 'react';

import UserContainerPlantsDetailedFiltering from './user-container-plants-detailed-filtering';
import UserContainerPlantsDetailedHeader from './user-container-plants-detailed-header';

type UserContainerPlantsDetailedProps = {
  initialTake: number;
  container: Container;
};

const UserContainerPlantsDetailed: React.FC<UserContainerPlantsDetailedProps> = (props) => {
  const { initialTake, container } = props;
  const [plants, setPlants] = useState<Plant[]>([]);

  const response = useFindContainerPlantsQuery({
    variables: {
      input: {
        where: { uuid: container.uuid },
        take: initialTake,
      },
    },
    skip: container?.uuid === undefined,
  });

  const { data, error, loading, variables, fetchMore } = response;

  const initialFilters: Filter<Plant>[] = [
    { property: 'type', value: '', enabled: true },
    { property: 'variety', value: '', enabled: true },
  ];
  const initialSort: Sort<Plant> = {
    property: 'createdAt',
    ascending: true,
  };

  const { filteredData, updateFilter, updateSort } = useFilter<Plant>(plants, initialFilters, initialSort);

  useEffect(() => {
    if (data && data.findContainerPlants.plants) {
      setPlants(data.findContainerPlants.plants);
    }
  }, [data]);

  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        input: {
          where: variables?.input.where ?? { uuid: container.uuid },
          take: variables?.input.take ?? initialTake,
          cursor: data?.findContainerPlants.cursor,
        },
      },
    });
  };

  const handleFilterTypeChanged = (value: string) => {
    updateFilter({ property: 'type', value, enabled: value !== 'NONE' });
  };

  const handleFilterVarietyChanged = (value: string) => {
    updateFilter({ property: 'variety', value, enabled: true });
  };

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-4">
        <UserContainerPlantsDetailedHeader container={container} />
        <UserContainerPlantsDetailedFiltering
          onFilterTypeChanged={handleFilterTypeChanged}
          onFilterVarietyChanged={handleFilterVarietyChanged}
        />

        {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}
        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : null}

        <PlantsFeed plants={filteredData} />

        {data && data.findContainerPlants && data.findContainerPlants.hasMore ? (
          <Button variant="ghost" colorScheme="secondary" className="w-full" onClick={handleLoadMore}>
            Load More
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default UserContainerPlantsDetailed;
