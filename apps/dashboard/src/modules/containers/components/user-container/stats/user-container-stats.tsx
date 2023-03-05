import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import { useCalculateContainerStatsQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import UserContainerStatsEntry from './user-container-stats-entry';

const UserContainerStats: React.FC = (props) => {
  const {} = props;
  const { container } = useUserContainerContext();
  const { data, error, loading } = useCalculateContainerStatsQuery({
    variables: {
      input: { uuid: container.uuid },
    },
    skip: container.uuid === undefined,
  });

  return (
    <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      {/* Details */}
      <div className="flex w-full flex-col space-y-4">
        <h2 className="text-2xl font-bold">Container Stats</h2>

        {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

        {loading ? (
          <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
        ) : null}

        {data && data.calculateContainerStats && data.calculateContainerStats ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UserContainerStatsEntry
              title="Plants Count"
              description="Total plants of the container"
              unit="plants"
              value={data.calculateContainerStats.plantsCount || '0'}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 15h10v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-4z" />
                  <path d="M12 9a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
                  <path d="M12 11a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
                  <line x1="12" y1="15" x2="12" y2="9" />
                </svg>
              }
            />
            <UserContainerStatsEntry
              title="Gross Produce"
              description="Total produce of the container"
              unit="kgs"
              value={data.calculateContainerStats.grossProduce || '0'}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="6" r="3" />
                  <path d="M6.835 9h10.33a1 1 0 0 1 .984 .821l1.637 9a1 1 0 0 1 -.984 1.179h-13.604a1 1 0 0 1 -.984 -1.179l1.637 -9a1 1 0 0 1 .984 -.821z" />
                </svg>
              }
            />
            <UserContainerStatsEntry
              title="Harvests Count"
              description="Total harvests of the container"
              unit="units"
              value={data.calculateContainerStats.harvestsCount || '0'}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="7 10 12 4 17 10" />
                  <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z" />
                  <circle cx="12" cy="15" r="2" />
                </svg>
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserContainerStats;
