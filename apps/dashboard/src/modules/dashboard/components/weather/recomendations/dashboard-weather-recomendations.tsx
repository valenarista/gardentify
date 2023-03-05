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
    <div className="flex flex-col space-y-4 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-xl font-semibold md:text-2xl">Weather Recomendations</h3>

      {error ? <span className="text-neutral-800 dark:text-neutral-100">{error.message}</span> : null}

      {loading ? (
        <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
      ) : null}

      {data && data.getWeatherForecast.forecast ? (
        <div className="flex flex-col gap-4">
          {recomendations.map((recomendation, index) => {
            return (
              <WeatherRecomendation
                key={`recomendation-${String(index)}`}
                title={recomendation.title}
                content={recomendation.content}
                renderCondition={recomendation.renderCondition}
                icon={recomendation.icon}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DashboardWeatherRecomendations;
