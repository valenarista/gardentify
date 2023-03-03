import { Weather } from '@modules/graphql/@generated/graphql';
import { WEATHER_TEMP_ALERT_THRESHOLDS } from '@modules/weather/lib/weather-lib';
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
    <div className="relative flex h-full flex-col items-center rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      <span className="text-lg font-bold text-neutral-800 dark:text-neutral-50">{parsedDay}</span>
      {shouldDisplayAlert ? <WeatherCardAlertConditions alertType={displayAlertType} /> : null}
      <WeatherCardSkyConditions weatherCode={weather.weatherCode} />
      <WeatherCardTemperature min={weather.temperatureMin} max={weather.temperatureMax} />
      <div className="mt-1.5 flex flex-col items-center justify-center whitespace-nowrap lg:flex-row lg:space-x-2">
        <div className="flex items-center justify-center space-x-2">
          <WeatherCardUVIndex uvIndex={weather.uvIndexMax} />
          <WeatherCardPrecipitation precipitation={weather.precipitationSum} />
        </div>
        <WeatherCardWind windSpeed={weather.windSpeedMax} windDirection={weather.windDirectionDominant} />
      </div>
    </div>
  );
};

export default WeatherCard;
