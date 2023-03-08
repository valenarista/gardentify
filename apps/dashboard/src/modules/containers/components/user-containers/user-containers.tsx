import { useAuthContext } from '@modules/auth/context/auth-context';
import useFilter, { Filter, Sort } from '@modules/common/hooks/use-filter';
import ContainersFeed from '@modules/containers/components/feed/containers-feed';
import { Container, useFindUserContainersQuery } from '@modules/graphql/@generated/graphql';
import { useEffect, useState } from 'react';

import UserContainersFiltering from './filtering/user-containers-filtering';
import UserContainersHeader from './user-containers-header';

const UserContainers: React.FC = () => {
  const { state } = useAuthContext();

  const [containers, setContainers] = useState<Container[]>([]);

  const response = useFindUserContainersQuery({
    variables: {
      input: {
        userUuid: state.user?.uuid!,
      },
    },
    skip: state.user === null,
  });

  const { data, error, loading } = response;

  const initialFilters: Filter<Container>[] = [
    { property: 'type', value: 'all', enabled: true },
    { property: 'dirtDepth', value: '', enabled: true },
  ];
  const initialSort: Sort<Container> = {
    property: 'createdAt',
    ascending: false,
  };

  const { filteredData, updateFilter } = useFilter<Container>(containers, initialFilters, initialSort);

  useEffect(() => {
    if (data && data.findUserContainers && data.findUserContainers.containers) {
      setContainers(data.findUserContainers.containers);
    }
  }, [data]);

  const handleFilterTypeChanged = (value: string) => {
    updateFilter({ property: 'type', value, enabled: value !== 'all' });
  };

  const handleFilterDirtDepthChanged = (value: string) => {
    updateFilter({ property: 'dirtDepth', value: Number(value), enabled: value !== '' });
  };

  return (
    <section className="container mx-auto flex max-w-6xl flex-col space-y-4 md:px-4 lg:px-6">
      <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 ">
        {/* Details */}
        <div className="flex w-full flex-col space-y-4">
          <UserContainersHeader username={state.loading ? 'Loading' : state.user?.username!} />
          <UserContainersFiltering
            onFilterTypeChanged={handleFilterTypeChanged}
            onFilterDirtDepthChanged={handleFilterDirtDepthChanged}
          />

          {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}
          {loading ? (
            <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
          ) : null}

          <ContainersFeed containers={filteredData} />
        </div>
      </div>
    </section>
  );
};

export default UserContainers;
