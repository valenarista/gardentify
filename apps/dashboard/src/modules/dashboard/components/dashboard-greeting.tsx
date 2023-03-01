import { User } from '@modules/graphql/@generated/graphql';
import React from 'react';

type DashboardGreetingProps = {
  username: User['username'];
};

const DashboardGreeting: React.FC<DashboardGreetingProps> = (props) => {
  const { username } = props;

  const currentWeekDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h1 className="text-start text-xl font-semibold md:text-2xl">Welcome Back, {username} 👋</h1>
      <h2 className="text-base md:text-lg">
        Have a great <strong>{currentWeekDay}!</strong>
      </h2>
    </div>
  );
};

export default DashboardGreeting;
