import { useGetWeatherForecastQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import DashboardWeatherForecast from './forecast/dashboard-weather-forecast';
import DashboardWeatherRain from './rain/dashboard-weather-rain';
import DashboardWeatherRecomendations from './recomendations/dashboard-weather-recomendations';

const DashboardWeather: React.FC = () => {
  const response = useGetWeatherForecastQuery({ variables: { input: { latitude: 52.55, longitude: -1.66 } } });
  // 52.554528232854445, -1.6640812521368695
  return (
    <div className="flex flex-col space-y-4">
      <DashboardWeatherForecast response={response} />
      <DashboardWeatherRain response={response} />
      <DashboardWeatherRecomendations response={response} />
    </div>
  );
};

export default DashboardWeather;
