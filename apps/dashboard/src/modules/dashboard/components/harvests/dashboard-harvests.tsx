import React from 'react';

import DashboardLatestsHarvests from './latests/dashboard-latests-harvests';
import DashboardWeekHarvests from './week/dashboard-week-harvests';

const DashboardHarvests: React.FC = () => {
  return (
    <>
      <DashboardLatestsHarvests />
      <DashboardWeekHarvests />
    </>
  );
};

export default DashboardHarvests;
