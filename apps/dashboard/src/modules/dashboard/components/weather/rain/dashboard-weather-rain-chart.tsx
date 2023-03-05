import BarChart from '@modules/charts/components/bar-chart';
import React from 'react';

import { WeatherRainDay } from './dashboard-weather-rain';

type DashboardWeatherRainProps = {
  rainDays: WeatherRainDay[];
};

const DashboardWeatherRainChart: React.FC<DashboardWeatherRainProps> = (props) => {
  const { rainDays } = props;

  const totalRain = rainDays.reduce((acc, curr) => curr.rain + acc, 0).toFixed(2);

  const labels = rainDays.map((rainDay) => new Date(rainDay.day).toLocaleDateString('en-US', { dateStyle: 'short' }));

  const rainDaysData = rainDays.map((rainDay) => rainDay.rain);

  return (
    <>
      {rainDays.length === 1 ? (
        <p>Not enough rainy days to calculate data!</p>
      ) : (
        <>
          <p className="mb-2">
            This week is expected to get <strong className="text-primary-700 dark:text-primary-400">{totalRain}</strong>{' '}
            mms of rain!
          </p>
          <BarChart title="Rain Days" labels={labels} data={rainDaysData} tooltipFormat={(value) => `${value} mms`} />
        </>
      )}
    </>
  );
};

export default DashboardWeatherRainChart;
