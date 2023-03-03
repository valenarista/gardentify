import { Weather } from '@modules/graphql/@generated/graphql';
import { WEATHER_TEMP_ALERT_THRESHOLDS } from '@modules/weather/lib/weather-lib';
import clsx from 'clsx';
import React from 'react';

type WeatherCardTemperatureProps = {
  min: Weather['temperatureMin'];
  max: Weather['temperatureMax'];
};

const WeatherCardTemperature: React.FC<WeatherCardTemperatureProps> = (props) => {
  const { min, max } = props;

  const alertMaxThreshold = max > WEATHER_TEMP_ALERT_THRESHOLDS[1];
  const alertMinThreshold = min < WEATHER_TEMP_ALERT_THRESHOLDS[0];

  return (
    <div className="mt-auto flex space-x-2 text-base">
      <span
        className={clsx(
          'font-semibold',
          alertMaxThreshold ? 'font-bold text-red-800 dark:text-red-300' : 'text-neutral-800 dark:text-neutral-50'
        )}
      >
        {max} °C
      </span>
      <span
        className={clsx(
          'font-semibold',
          alertMinThreshold ? 'font-bold text-blue-800 dark:text-blue-300' : 'text-neutral-800 dark:text-neutral-50'
        )}
      >
        {min} °C
      </span>
    </div>
  );
};

export default WeatherCardTemperature;
