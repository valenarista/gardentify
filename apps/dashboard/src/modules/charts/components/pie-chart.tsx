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

import { BaseChartProps } from '../lib/charts-lib';
import ChartWrapper from './chart-wrapper';

ChartJS.register(CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type PieChartProps = BaseChartProps & {
  colors: {
    borders: string[];
    backgrounds: string[];
  };
};

const PieChart: React.FC<PieChartProps> = (props) => {
  const { title, labels, tooltipFormat, data, colors, animate = false } = props;

  const chartOptions: React.ComponentPropsWithoutRef<typeof Pie>['options'] = {
    maintainAspectRatio: false,
    animation: { animateRotate: animate, animateScale: animate },
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

  const chartData: React.ComponentPropsWithoutRef<typeof Pie>['data'] = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: colors.borders,
        backgroundColor: colors.backgrounds,
      },
    ],
  };

  return (
    <ChartWrapper height={250}>
      <Pie options={chartOptions} data={chartData} />
    </ChartWrapper>
  );
};

export default PieChart;
