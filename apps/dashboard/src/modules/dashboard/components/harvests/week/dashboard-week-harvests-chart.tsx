import LineChart from '@modules/charts/components/line-chart';
import { Harvest } from '@modules/graphql/@generated/graphql';
import React from 'react';

type DashboardWeekHarvestsChartProps = {
  weekHarvests: Harvest[];
};

const DashboardWeekHarvestsChart: React.FC<DashboardWeekHarvestsChartProps> = (props) => {
  const { weekHarvests } = props;

  const totalHarvested = weekHarvests.reduce((acc, harvest) => {
    return acc + harvest.weight;
  }, 0);

  const weekHarvestsLabels = weekHarvests.map((harvest) =>
    new Date(harvest.createdAt).toLocaleDateString('en-US', { dateStyle: 'short' })
  );

  const weekHarvestsData = weekHarvests.map((harvest) => harvest.weight);

  return (
    <>
      {weekHarvests.length === 1 ? (
        <p>Not enough harvests to calculate data!</p>
      ) : (
        <>
          <p className="mb-2">
            You have harvested a total amount of{' '}
            <strong className="text-primary-700 dark:text-primary-400">{totalHarvested.toFixed(2)}</strong> kgrms, great
            work!
          </p>
          <LineChart
            title="Harvests Weight Per Day"
            labels={weekHarvestsLabels}
            data={weekHarvestsData}
            tooltipFormat={(value) => `${value} kg`}
          />
        </>
      )}
    </>
  );
};

export default DashboardWeekHarvestsChart;
