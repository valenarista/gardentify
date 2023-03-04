import React from 'react';

import DashboardLatestHarvests from './dashboard-latest-harvests';
import DashboardWeekHarvests from './dashboard-week-harvests';

const DashboardHarvests: React.FC = () => {
  return (
    <>
      <DashboardLatestHarvests />
      <DashboardWeekHarvests />
    </>
  );
};

export default DashboardHarvests;
