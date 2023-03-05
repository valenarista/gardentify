import { useThemeContext } from '@modules/theme/context/theme-context';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

import { BaseChartProps } from '../lib/charts-lib';
import ChartWrapper from './chart-wrapper';

ChartJS.register(CategoryScale, LinearScale, PointElement, Filler, LineElement, Title, Tooltip, Legend);

type LineChartProps = BaseChartProps & {
  colors?: {
    border: string;
    background: string;
  };
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { theme } = useThemeContext();

  const {
    title,
    labels,
    tooltipFormat,
    data,
    colors = {
      border: theme === 'dark' ? 'rgb(74, 222, 128)' : 'rgb(21, 128, 61)',
      background: theme === 'dark' ? 'rgba(74, 222, 128, 0.25)' : 'rgba(21, 128, 61, 0.35)',
    },
  } = props;

  const chartOptions: React.ComponentPropsWithoutRef<typeof Line>['options'] = {
    maintainAspectRatio: false,
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
    animation: {
      responsiveAnimationDuration: 0,
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? 'rgb(229, 229, 229)' : 'rgb(38, 38, 38)',
        },
      },
      y: {
        ticks: {
          color: theme === 'dark' ? 'rgb(229, 229, 229)' : 'rgb(38, 38, 38)',
        },
      },
    },
  };

  const chartData: React.ComponentPropsWithoutRef<typeof Line>['data'] = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: colors.border,
        backgroundColor: colors.background,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  return (
    <ChartWrapper>
      <Line options={chartOptions} data={chartData} />
    </ChartWrapper>
  );
};

export default LineChart;
