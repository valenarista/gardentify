import { useGetWeatherForecastQuery } from '@modules/graphql/@generated/graphql';
import WeatherRecomendation from '@modules/weather/components/recomendation/weather-recomendation';
import useWeatherRecomendations from '@modules/weather/hooks/use-weather-recomendations';
import React, { useEffect } from 'react';

type DashboardWeatherRecomendationsProps = {
  response: Pick<ReturnType<typeof useGetWeatherForecastQuery>, 'data' | 'error' | 'loading'>;
};

const DashboardWeatherRecomendations: React.FC<DashboardWeatherRecomendationsProps> = (props) => {
  const { response } = props;
  const { data, error, loading } = response;
  const { recomendations, updateWeatherForecast } = useWeatherRecomendations([]);

  useEffect(() => {
    if (data && data.getWeatherForecast.forecast) {
      updateWeatherForecast(data.getWeatherForecast.forecast);
    }
  }, [data]);

  return (
    <div className="flex h-fit flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-2xl font-bold">Weather Recomendations</h3>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.getWeatherForecast.forecast && recomendations.length > 0 ? (
        <div className="flex flex-col gap-4">
          {recomendations.map((recomendation, index) => {
            return (
              <WeatherRecomendation
                key={`recomendation-${String(index)}`}
                title={recomendation.title}
                content={recomendation.content}
                icon={recomendation.icon}
              />
            );
          })}
        </div>
      ) : (
        <span className="text-neutral-800 dark:text-neutral-100">
          No weather recomendations available at the moment!
        </span>
      )}
    </div>
  );
};

export default DashboardWeatherRecomendations;
