import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  FindWeekHarvestsDocument,
  FindWeekHarvestsQuery,
  FindWeekHarvestsQueryVariables,
  Harvest,
} from '@modules/graphql/@generated/graphql';
import HarvestCard from '@modules/harvests/components/cards/harvest-card';
import React from 'react';

import DashboardLatest from '../dashboard-latest';

const DashboardWeekHarvests: React.FC = () => {
  const { response } = useApiQuery<FindWeekHarvestsQuery, FindWeekHarvestsQueryVariables>(FindWeekHarvestsDocument);

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

export default DashboardWeekHarvests;
