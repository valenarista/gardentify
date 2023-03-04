import { Weather } from '@modules/graphql/@generated/graphql';
import WeatherRecomendation from '@modules/weather/components/recomendation/weather-recomendation';
import useWeatherRecomendations from '@modules/weather/hooks/use-weather-recomendations';
import React from 'react';

type DashboardWeatherRecomendationsProps = {
  weatherForecast: Weather[];
};

const DashboardWeatherRecomendations: React.FC<DashboardWeatherRecomendationsProps> = (props) => {
  const { weatherForecast } = props;
  const { recomendations } = useWeatherRecomendations(weatherForecast);

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
      <h3 className="text-xl font-semibold md:text-2xl">Weather Recomendations</h3>

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
    </div>
  );
};

export default DashboardWeatherRecomendations;
