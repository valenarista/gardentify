import React from 'react';

import DashboardLatestHarvests from './latests/dashboard-latest-harvests';
import DashboardWeekHarvests from './week/dashboard-week-harvests';

const DashboardHarvests: React.FC = () => {
  return (
    <>
      <DashboardLatestHarvests />
      <DashboardWeekHarvests />
    </>
  );
};

export default DashboardHarvests;
