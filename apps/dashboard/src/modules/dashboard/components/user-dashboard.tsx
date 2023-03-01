import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  FindHarvestsDocument,
  FindHarvestsQuery,
  FindHarvestsQueryVariables,
  Harvest,
  User,
} from '@modules/graphql/@generated/graphql';
import HarvestCard from '@modules/harvests/components/cards/harvest-card';
import React from 'react';

import DashboardGreeting from './dashboard-greeting';
import DashboardLatest from './dashboard-latest';

type UserDashboardProps = {
  user: User;
};

const UserDashboard: React.FC<UserDashboardProps> = (props) => {
  const { user } = props;

  const { response, loading } = useApiQuery<FindHarvestsQuery, FindHarvestsQueryVariables>(FindHarvestsDocument, {
    variables: { input: { take: 3, includePlant: true } },
  });

  const harvests = response?.data?.findHarvests.harvests || [];

  return (
    <section className="container mx-auto flex max-w-6xl flex-col space-y-4 md:px-4 lg:px-6">
      <DashboardGreeting username={user.username} />
      <DashboardLatest<Harvest>
        name="Latest Harvests"
        data={harvests}
        render={(harvest, index) => {
          return <HarvestCard key={`harvest-${index}`} harvest={harvest} showPlantIcon />;
        }}
      />
    </section>
  );
};

export default UserDashboard;
