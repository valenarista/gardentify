import { useAuthContext } from '@modules/auth/context/auth-context';
import { useFindLatestsHarvestsQuery } from '@modules/graphql/@generated/graphql';
import HarvestsFeed from '@modules/harvests/components/feed/harvests-feed';
import React from 'react';

const DashboardLatestsHarvests: React.FC = () => {
  const { user } = useAuthContext();
  const { data, error, loading } = useFindLatestsHarvestsQuery({
    variables: {
      input: {
        userUuid: user?.uuid!,
        take: 6,
        includePlant: true,
      },
    },
    skip: user === null,
  });

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">Your latests harvests</h3>

      <p className="mb-2">Take a look at your latests harvests in your garden</p>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.findLatestsHarvests && data.findLatestsHarvests.harvests ? (
        <HarvestsFeed harvests={data.findLatestsHarvests.harvests} includePlantDetails={true} />
      ) : null}
    </div>
  );
};

export default DashboardLatestsHarvests;
