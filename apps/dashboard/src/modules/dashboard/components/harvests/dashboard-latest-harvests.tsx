import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  FindHarvestsDocument,
  FindHarvestsQuery,
  FindHarvestsQueryVariables,
  Harvest,
} from '@modules/graphql/@generated/graphql';
import HarvestCard from '@modules/harvests/components/cards/harvest-card';
import React from 'react';

import DashboardLatest from '../dashboard-latest';

const DashboardLatestHarvests: React.FC = () => {
  const { response, loading } = useApiQuery<FindHarvestsQuery, FindHarvestsQueryVariables>(FindHarvestsDocument, {
    variables: { input: { take: 4, includePlant: true } },
  });

  const harvests = response?.data?.findHarvests.harvests || [];

  return (
    <DashboardLatest<Harvest>
      name="Latest Harvests"
      data={harvests}
      loading={loading}
      render={(harvest, index) => {
        return <HarvestCard key={`harvest-${index}`} harvest={harvest} includePlantDetails />;
      }}
    />
  );
};

export default DashboardLatestHarvests;
