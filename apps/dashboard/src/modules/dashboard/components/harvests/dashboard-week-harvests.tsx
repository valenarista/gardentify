import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  FindWeekHarvestsDocument,
  FindWeekHarvestsQuery,
  FindWeekHarvestsQueryVariables,
} from '@modules/graphql/@generated/graphql';
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

const DashboardWeekHarvests: React.FC = () => {
  const { theme } = useThemeContext();
  const { response } = useApiQuery<FindWeekHarvestsQuery, FindWeekHarvestsQueryVariables>(FindWeekHarvestsDocument);

  const weekHarvests = response?.data?.findWeekHarvests.harvests || [];

  const totalHarvested = weekHarvests.reduce((acc, harvest) => {
    return acc + harvest.weight;
  }, 0);

  const labels = weekHarvests.map((harvest) =>
    new Date(harvest.createdAt).toLocaleDateString('en-US', { dateStyle: 'short' })
  );
  const harvestsData = weekHarvests.map((harvest) => harvest.weight);

  const chartOptions: React.ComponentPropsWithoutRef<typeof Line>['options'] = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (item) => `${item.formattedValue} kg`,
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
        data: harvestsData,
        borderColor: theme === 'dark' ? 'rgb(74 222 128)' : 'rgb(21 128 61)',
        tension: 0.35,
      },
    ],
  };

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-xl font-semibold md:text-2xl">This week harvests</h3>
      {weekHarvests.length === 1 ? (
        <p>Not enough harvests to calculate data!</p>
      ) : (
        <>
          <p className="mb-2">
            You have harvested a total amount of{' '}
            <strong className="text-primary-700 dark:text-primary-400">{totalHarvested}</strong> kgrms, great work!
          </p>
          <div className="relative m-auto h-[175px] w-[99%]">
            <Line options={chartOptions} data={chartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardWeekHarvests;
