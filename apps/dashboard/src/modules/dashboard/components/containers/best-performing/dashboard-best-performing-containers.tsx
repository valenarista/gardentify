import { useAuthContext } from '@modules/auth/context/auth-context';
import BestPerformingContainersFeed from '@modules/containers/components/feed/best-performing-containers-feed';
import { useFindBestPerformingContainersQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

const DashboardBestPerformingContainers: React.FC = () => {
  const { state } = useAuthContext();
  const response = useFindBestPerformingContainersQuery({
    variables: {
      input: {
        userUuid: state.user?.uuid!,
        take: 4,
      },
    },
    skip: state.user === null,
  });

  const { data, error, loading } = response;

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">Best Performing Containers</h3>

      <p className="mb-2">Take a look at your best performing containerss based on their total harvets</p>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.findBestPerformingContainers && data.findBestPerformingContainers.containers ? (
        <BestPerformingContainersFeed containers={data.findBestPerformingContainers.containers} />
      ) : null}
    </div>
  );
};

export default DashboardBestPerformingContainers;
