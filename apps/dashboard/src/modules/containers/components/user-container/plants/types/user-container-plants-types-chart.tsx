import { Plant } from '@modules/graphql/@generated/graphql';
import { useThemeContext } from '@modules/theme/context/theme-context';
import {
  ArcElement,
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
import { Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type UserContainerPlantsTypesChartProps = {
  containerPlants: Plant[];
};

const UserContainerPlantsTypesChart: React.FC<UserContainerPlantsTypesChartProps> = (props) => {
  const { containerPlants } = props;
  const { theme } = useThemeContext();

  const sortedPlants = [...containerPlants].sort((a, b) => (a.type.valueOf() > b.type.valueOf() ? 1 : -1));

  const plantTypes = sortedPlants.reduce<{ [key: string]: number }>((counts, plant) => {
    if (plant.type in counts) {
      counts[plant.type]++;
    } else {
      counts[plant.type] = 1;
    }
    return counts;
  }, {});

  const plantTypesOccurrences = Object.values(plantTypes);
  const plantTypesLabels = Object.keys(plantTypes).map((type) => type.toLocaleLowerCase());

  const chartOptions: React.ComponentPropsWithoutRef<typeof Pie>['options'] = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (item) => `${item.formattedValue} plants`,
        },
      },
      legend: {
        display: true,
      },
    },
  };

  const chartData: React.ComponentPropsWithoutRef<typeof Pie>['data'] = {
    labels: plantTypesLabels,
    datasets: [
      {
        label: 'Plant Type',
        data: plantTypesOccurrences,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  };

  return (
    <>
      {containerPlants.length === 1 ? (
        <p>Not enough plants to calculate data!</p>
      ) : (
        <>
          <p className="mb-2">See the plant growth performance in the chart below.</p>
          <div className="relative m-auto h-[175px] w-[99%]">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </>
  );
};

export default UserContainerPlantsTypesChart;
