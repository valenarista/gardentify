import { useThemeContext } from '@modules/theme/context/theme-context';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { BaseChartProps } from '../lib/charts-lib';
import ChartWrapper from './chart-wrapper';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = BaseChartProps & {
  colors?: {
    border: string;
    background: string;
  };
};

const BarChart: React.FC<BarChartProps> = (props) => {
  const { theme } = useThemeContext();

  const {
    title,
    labels,
    tooltipFormat,
    data,
    colors = {
      border: theme === 'dark' ? 'rgb(74, 222, 128)' : 'rgb(21, 128, 61)',
      background: theme === 'dark' ? 'rgba(74, 222, 128, 0.45)' : 'rgba(21, 128, 61, 0.45)',
    },
  } = props;

  const chartOptions: React.ComponentPropsWithoutRef<typeof Bar>['options'] = {
    maintainAspectRatio: false,
    animation: {},
    plugins: {
      tooltip: {
        callbacks: {
          label: (item) => tooltipFormat(item.formattedValue),
        },
      },
      legend: {
        display: true,
      },
    },
  };

  const chartData: React.ComponentPropsWithoutRef<typeof Bar>['data'] = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: colors.border,
        backgroundColor: colors.background,
        borderRadius: 5,
      },
    ],
  };

  return (
    <ChartWrapper height={250}>
      <Bar options={chartOptions} data={chartData} />
    </ChartWrapper>
  );
};

export default BarChart;
