import { useGetWeatherForecastQuery } from '@modules/graphql/@generated/graphql';
import React from 'react';

import DashboardWeatherForecast from './forecast/dashboard-weather-forecast';
import DashboardWeatherRain from './rain/dashboard-weather-rain';
import DashboardWeatherRecomendations from './recomendations/dashboard-weather-recomendations';

const DashboardWeather: React.FC = () => {
  const response = useGetWeatherForecastQuery({ variables: { input: { latitude: -38.7, longitude: -62.24 } } });

  return (
    <div className="flex flex-col space-y-4">
      <DashboardWeatherForecast response={response} />
      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardWeatherRain response={response} />
        <DashboardWeatherRecomendations response={response} />
      </div>
    </div>
  );
};

export default DashboardWeather;
