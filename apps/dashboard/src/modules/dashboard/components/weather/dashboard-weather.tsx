import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  GetWeatherForecastDocument,
  GetWeatherForecastQuery,
  GetWeatherForecastQueryVariables,
} from '@modules/graphql/@generated/graphql';
import React from 'react';

import DashboardWeatherForecast from './forecast/dashboard-weather-forecast';
import DashboardWeatherRecomendations from './recomendations/dashboard-weather-recomendations';

const DashboardWeather: React.FC = () => {
  const { response } = useApiQuery<GetWeatherForecastQuery, GetWeatherForecastQueryVariables>(
    GetWeatherForecastDocument,
    { variables: { input: { latitude: -38.72, longitude: -62.27 } } }
  );

  const weatherForecast = response?.data?.getWeatherForecast.forecast || [];

  return (
    <div className="flex flex-col space-y-4">
      <DashboardWeatherForecast weatherForecast={weatherForecast} />
      <DashboardWeatherRecomendations weatherForecast={weatherForecast} />
    </div>
  );
};

export default DashboardWeather;
