import { User } from '@modules/graphql/@generated/graphql';
import React from 'react';

import DashboardContainers from './containers/dashboard-containers';
import DashboardGreeting from './dashboard-greeting';
import DashboardHarvests from './harvests/dashboard-harvests';
import DashboardWeather from './weather/dashboard-weather';

type UserDashboardProps = {
  user: User;
};

const UserDashboard: React.FC<UserDashboardProps> = (props) => {
  const { user } = props;

  return (
    <section className="container mx-auto flex max-w-6xl flex-col space-y-4 md:px-4 lg:px-6">
      <DashboardGreeting username={user.username} />
      <DashboardContainers />
      <DashboardHarvests />
      <DashboardWeather />
    </section>
  );
};

export default UserDashboard;
