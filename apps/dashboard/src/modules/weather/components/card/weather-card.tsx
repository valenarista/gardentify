import { Weather } from '@modules/graphql/@generated/graphql';
import { WEATHER_TEMP_ALERT_THRESHOLDS } from '@modules/weather/lib/weather-lib';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';

import WeatherCardAlertConditions from './weather-card-alert-conditions';
import WeatherCardPrecipitation from './weather-card-precipitation';
import WeatherCardSkyConditions from './weather-card-sky-conditions';
import WeatherCardTemperature from './weather-card-temperature';
import WeatherCardUVIndex from './weather-card-uv-index';
import WeatherCardWind from './weather-card-wind';

type WeatherCardProps = {
  weather: Weather;
};

const WeatherCard: React.FC<WeatherCardProps> = (props) => {
  const { weather } = props;
  const router = useRouter();

  const parsedDay = new Date(weather.time).toLocaleDateString(router.locale, {
    day: 'numeric',
    weekday: 'short',
    timeZone: 'UTC',
  });

  const shouldDisplayAlert =
    weather.temperatureMin < WEATHER_TEMP_ALERT_THRESHOLDS[0] ||
    weather.temperatureMax > WEATHER_TEMP_ALERT_THRESHOLDS[1];

  const displayAlertType =
    weather.temperatureMin < WEATHER_TEMP_ALERT_THRESHOLDS[0]
      ? 'cold'
      : weather.temperatureMax > WEATHER_TEMP_ALERT_THRESHOLDS[1]
      ? 'hot'
      : 'hot';

  return (
    <div className="relative flex h-full items-center rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900 md:flex-col">
      <div className="flex flex-col items-start justify-center md:items-center">
        <span className="text-lg font-bold text-neutral-800 dark:text-neutral-50">{parsedDay}</span>
        <WeatherCardSkyConditions weatherCode={weather.weatherCode} />
        <WeatherCardTemperature min={weather.temperatureMin} max={weather.temperatureMax} />
      </div>
      <div
        className={clsx(
          'ml-auto flex h-full flex-col items-end justify-center whitespace-nowrap md:mt-1.5 md:ml-0 md:items-center xl:flex-row xl:space-x-2',
          shouldDisplayAlert ? 'mt-9' : ''
        )}
      >
        <div className="flex flex-col items-end justify-center space-x-2 md:flex-row md:items-center">
          <WeatherCardUVIndex uvIndex={weather.uvIndexMax} />
          <WeatherCardPrecipitation precipitation={weather.precipitationSum} />
        </div>
        <WeatherCardWind windSpeed={weather.windSpeedMax} windDirection={weather.windDirectionDominant} />
        {shouldDisplayAlert ? <WeatherCardAlertConditions alertType={displayAlertType} /> : null}
      </div>
    </div>
  );
};

export default WeatherCard;
