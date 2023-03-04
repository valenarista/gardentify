import { Weather } from '@modules/graphql/@generated/graphql';
import React from 'react';

type WeatherCardWindProps = {
  windSpeed: Weather['windSpeedMax'];
  windDirection: Weather['windDirectionDominant'];
};

const WeatherCardWind: React.FC<WeatherCardWindProps> = (props) => {
  const { windSpeed, windDirection } = props;

  return (
    <div className="flex flex-col items-end justify-center space-x-2 md:flex-row md:items-center">
      {/* Speed */}
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 stroke-blue-700 dark:stroke-blue-300"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
          <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
          <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
        </svg>
        <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-50">{windSpeed} km/h</span>
      </div>
      {/* Direction */}
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 stroke-sky-700 dark:stroke-sky-300"
          style={{ transform: `rotate(${windDirection}deg)` }}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="12" y1="18" x2="12" y2="3" />
          <path d="M15 6l-3 -3l-3 3" />
          <path d="M15 21l-3 -3l-3 3" />
        </svg>
        <span className="ml-1 text-sm font-semibold text-neutral-800 dark:text-neutral-50">{windDirection} °</span>
      </div>
    </div>
  );
};

export default WeatherCardWind;
