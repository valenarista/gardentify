import { Weather } from '@modules/graphql/@generated/graphql';
import React from 'react';

import WeatherCardSkyConditions from './weather-card-sky-conditions';
import WeatherCardTemperature from './weather-card-temperature';

type WeatherCardProps = {
  weather: Weather;
};

const WeatherCard: React.FC<WeatherCardProps> = (props) => {
  const { weather } = props;

  const day = new Date(weather.time).toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="flex h-full flex-col items-center rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      <span className="text-lg font-bold text-neutral-800 dark:text-neutral-50">{day}</span>
      <WeatherCardSkyConditions weatherCode={weather.weatherCode} />
      <WeatherCardTemperature min={weather.temperatureMin} max={weather.temperatureMax} />
    </div>
  );
};

export default WeatherCard;
