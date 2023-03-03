import { Weather } from '@modules/graphql/@generated/graphql';
import React from 'react';

type WeatherCardPrecipitationProps = {
  precipitation: Weather['precipitationSum'];
};

const WeatherCardPrecipitation: React.FC<WeatherCardPrecipitationProps> = (props) => {
  const { precipitation } = props;

  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 stroke-cyan-700 dark:stroke-cyan-300"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197 -8l-5.2 8z" />
      </svg>
      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-50">{precipitation} mm</span>
    </div>
  );
};

export default WeatherCardPrecipitation;
