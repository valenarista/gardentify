import { HeightRegistration } from '@modules/graphql/@generated/graphql';
import { useThemeContext } from '@modules/theme/context/theme-context';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type PlantHeightRegistrationsGrowthChartProps = {
  heightRegistrations: HeightRegistration[];
};

const PlantHeightRegistrationsGrowthChart: React.FC<PlantHeightRegistrationsGrowthChartProps> = (props) => {
  const { heightRegistrations } = props;
  const { theme } = useThemeContext();

  const labels = heightRegistrations.map((heightRegistration) =>
    new Date(heightRegistration.createdAt).toLocaleDateString('en-US', { dateStyle: 'short' })
  );
  const growthData = heightRegistrations.map((heightRegistration) => heightRegistration.height);

  const chartOptions: React.ComponentPropsWithoutRef<typeof Line>['options'] = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (item) => `${item.formattedValue} cms`,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(38 38 38)',
        },
      },
      y: {
        ticks: {
          color: theme === 'dark' ? 'rgb(229 229 229)' : 'rgb(38 38 38)',
        },
      },
    },
  };

  const chartData: React.ComponentPropsWithoutRef<typeof Line>['data'] = {
    labels,
    datasets: [
      {
        label: 'Harvests Weight',
        data: growthData,
        borderColor: theme === 'dark' ? 'rgb(74 222 128)' : 'rgb(21 128 61)',
        tension: 0.35,
      },
    ],
  };

  return (
    <>
      {heightRegistrations.length === 1 ? (
        <p>Not enough height registrations to calculate data!</p>
      ) : (
        <>
          <p className="mb-2">See the plant growth performance in the chart below.</p>
          <div className="relative m-auto h-[175px] w-[99%]">
            <Line options={chartOptions} data={chartData} />
          </div>
        </>
      )}
    </>
  );
};

export default PlantHeightRegistrationsGrowthChart;
