import { useGetWeatherForecastQuery } from '@modules/graphql/@generated/graphql';
import React, { useEffect, useState } from 'react';

import DashboardWeatherRainChart from './dashboard-weather-rain-chart';

export type WeatherRainDay = {
  day: Date;
  rain: number;
};

type DashboardWeatherRainProps = {
  response: Pick<ReturnType<typeof useGetWeatherForecastQuery>, 'data' | 'error' | 'loading'>;
};

const DashboardWeatherRain: React.FC<DashboardWeatherRainProps> = (props) => {
  const { response } = props;
  const { data, error, loading } = response;

  const [rainDays, setRainDays] = useState<WeatherRainDay[]>([]);

  useEffect(() => {
    if (data && data.getWeatherForecast.forecast) {
      const forecast = data.getWeatherForecast.forecast;
      const weekRainDays: WeatherRainDay[] = forecast
        .filter((forecastDay) => forecastDay.precipitationSum > 0.0)
        .map((rainDay) => {
          return {
            day: new Date(rainDay.time),
            rain: rainDay.precipitationSum,
          };
        });
      setRainDays(weekRainDays);
    }
  }, [data]);

  return (
    <div className="flex flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">Week Rain</h3>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.getWeatherForecast.forecast ? <DashboardWeatherRainChart rainDays={rainDays} /> : null}
    </div>
  );
};

export default DashboardWeatherRain;
