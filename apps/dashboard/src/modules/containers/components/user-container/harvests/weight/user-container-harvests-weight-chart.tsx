import BarChart from '@modules/charts/components/bar-chart';
import { ContainerHarvest } from '@modules/graphql/@generated/graphql';
import React, { useMemo } from 'react';

type MonthMap = { [month: string]: number };

type UserContainerHarvestsWeightChartProps = {
  harvests: ContainerHarvest[];
};

const UserContainerHarvestsWeightChart: React.FC<UserContainerHarvestsWeightChartProps> = (props) => {
  const { harvests } = props;

  const groupedHarvests = useMemo(() => {
    const monthMap: MonthMap = harvests.reduce((acc: MonthMap, harvest: ContainerHarvest) => {
      const month = new Date(harvest.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + harvest.weight;

      return acc;
    }, {});

    return monthMap;
  }, [harvests]);

  const harvestsLabels = Object.keys(groupedHarvests);
  const harvestsData = Object.values(groupedHarvests);

  return (
    <>
      {harvests.length <= 1 ? (
        <p>Not enough harvests to calculate data!</p>
      ) : (
        <>
          <p className="mb-2">See the harvests performance in the chart below.</p>
          <BarChart
            title="Container Harvests Monthly"
            labels={harvestsLabels}
            data={harvestsData}
            tooltipFormat={(value) => `${value} kgrs`}
          />
        </>
      )}
    </>
  );
};

export default UserContainerHarvestsWeightChart;
