import BarChart from '@modules/charts/components/bar-chart';
import { Harvest } from '@modules/graphql/@generated/graphql';
import React, { useMemo } from 'react';

type DashboardWeekHarvestsChartProps = {
  weekHarvests: Harvest[];
};

const DashboardWeekHarvestsChart: React.FC<DashboardWeekHarvestsChartProps> = (props) => {
  const { weekHarvests } = props;

  const totalHarvested = weekHarvests.reduce((acc, harvest) => {
    return acc + harvest.weight;
  }, 0);

  const simplifyHarvestData = (date: Date) => {
    const dateToParse = new Date(date);
    const simplifiedDate = new Date(dateToParse.getFullYear(), dateToParse.getMonth(), dateToParse.getDay());
    return simplifiedDate.toLocaleString().split(',')[0];
  };

  const parsedWeekHarvests = useMemo(() => {
    const harvestDayMap = new Map<string, number>();

    weekHarvests.forEach((harvest) => {
      const harvestDate = simplifyHarvestData(harvest.createdAt);
      const prevValue = harvestDayMap.get(harvestDate);
      if (prevValue) {
        harvestDayMap.set(harvestDate, harvest.weight + prevValue);
      } else {
        harvestDayMap.set(harvestDate, harvest.weight);
      }
    });

    return harvestDayMap;
  }, [weekHarvests]);

  const sortedEntries = useMemo(() => {
    const sorted = [...Array.from(parsedWeekHarvests.entries())].sort(
      (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
    );
    return sorted;
  }, [parsedWeekHarvests]);

  const weekHarvestsLabels = sortedEntries.map((entry) => entry[0]);

  const weekHarvestsData = sortedEntries.map((entry) => entry[1].toFixed(2));

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
          <BarChart
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
