import { useGetWeatherForecastQuery } from '@modules/graphql/@generated/graphql';
import WeatherCard from '@modules/weather/components/card/weather-card';
import React from 'react';

type DashboardWeatherForecastProps = {
  response: Pick<ReturnType<typeof useGetWeatherForecastQuery>, 'data' | 'error' | 'loading'>;
};

const DashboardWeatherForecast: React.FC<DashboardWeatherForecastProps> = (props) => {
  const { response } = props;
  const { data, error, loading } = response;

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">Weather Forecast</h3>

      <p className="mb-2">
        See the forecast for the incoming week down below so that you can plan out your week in your garden.
      </p>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.getWeatherForecast.forecast ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.getWeatherForecast.forecast.map((forecast, index) => {
            return <WeatherCard key={`weather-${String(index)}`} weather={forecast} />;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DashboardWeatherForecast;
