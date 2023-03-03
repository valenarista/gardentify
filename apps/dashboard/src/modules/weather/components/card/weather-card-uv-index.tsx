import { Weather } from '@modules/graphql/@generated/graphql';
import React from 'react';

type WeatherCardUVIndexProps = {
  uvIndex: Weather['uvIndexMax'];
};

const WeatherCardUVIndex: React.FC<WeatherCardUVIndexProps> = (props) => {
  const { uvIndex } = props;

  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 stroke-purple-700 dark:stroke-purple-300"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 1 1 8 0" />
        <path d="M12 4v-1" />
        <path d="M13 16l2 5h1l2 -5" />
        <path d="M6 16v3a2 2 0 1 0 4 0v-3" />
      </svg>
      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-50">{uvIndex}</span>
    </div>
  );
};

export default WeatherCardUVIndex;
