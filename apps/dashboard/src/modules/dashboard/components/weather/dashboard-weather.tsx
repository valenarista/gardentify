import useApiQuery from '@modules/common/hooks/use-api-query';
import {
  GetWeatherForecastDocument,
  GetWeatherForecastQuery,
  GetWeatherForecastQueryVariables,
} from '@modules/graphql/@generated/graphql';
import WeatherCard from '@modules/weather/components/card/weather-card';
import React from 'react';

const DashboardWeather: React.FC = () => {
  const { response, loading } = useApiQuery<GetWeatherForecastQuery, GetWeatherForecastQueryVariables>(
    GetWeatherForecastDocument,
    { variables: { input: { latitude: -38.72, longitude: -62.27 } } }
  );

  const weatherForecast = response?.data?.getWeatherForecast.forecast || [];

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-xl font-semibold md:text-2xl">Weather Forecast</h3>

      {loading && !response?.data ? (
        <span>Loading</span>
      ) : (
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          }}
        >
          {weatherForecast.map((forecast, index) => {
            return <WeatherCard key={`weather-${String(index)}`} weather={forecast} />;
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardWeather;