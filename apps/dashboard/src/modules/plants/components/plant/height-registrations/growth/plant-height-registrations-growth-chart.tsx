import LineChart from '@modules/charts/components/line-chart';
import { HeightRegistration } from '@modules/graphql/@generated/graphql';
import React from 'react';

type PlantHeightRegistrationsGrowthChartProps = {
  heightRegistrations: HeightRegistration[];
};

const PlantHeightRegistrationsGrowthChart: React.FC<PlantHeightRegistrationsGrowthChartProps> = (props) => {
  const { heightRegistrations } = props;

  const labels = heightRegistrations.map((heightRegistration) =>
    new Date(heightRegistration.createdAt).toLocaleDateString('en-US', { dateStyle: 'short' })
  );
  const growthData = heightRegistrations.map((heightRegistration) => heightRegistration.height);

  return (
    <>
      {heightRegistrations.length === 1 ? (
        <p>Not enough height registrations to calculate data!</p>
      ) : (
        <>
          <p className="mb-2">See the plant growth performance in the chart below.</p>
          <LineChart title="Plant Growth" labels={labels} data={growthData} tooltipFormat={(value) => `${value} cms`} />
        </>
      )}
    </>
  );
};

export default PlantHeightRegistrationsGrowthChart;
