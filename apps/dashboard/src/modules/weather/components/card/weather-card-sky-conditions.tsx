import { Weather } from '@modules/graphql/@generated/graphql';
import { getWeatherSkyConditionsFromCode } from '@modules/weather/lib/weather-lib';
import React from 'react';

type WeatherCardSkyConditionsProps = {
  weatherCode: Weather['weatherCode'];
};

const WeatherCardSkyConditions: React.FC<WeatherCardSkyConditionsProps> = (props) => {
  const { weatherCode } = props;

  let icon: JSX.Element | undefined;

  if (weatherCode === 0)
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill-rule="nonzero"
            d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
          />
        </g>
      </svg>
    );

  if (weatherCode === 1)
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M8 12h2v2H4v-2h2a6 6 0 1 1 6 6v-2a4 4 0 1 0-4-4zm-2 8h9v2H6v-2zm-4-4h8v2H2v-2zm9-15h2v3h-2V1zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3z" />
        </g>
      </svg>
    );

  if (weatherCode === 2)
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M9.984 5.06a6.5 6.5 0 1 1 11.286 6.436A5.5 5.5 0 0 1 17.5 21L9 20.999a8 8 0 1 1 .984-15.94zm2.071.544a8.026 8.026 0 0 1 4.403 4.495 5.529 5.529 0 0 1 3.12.307 4.5 4.5 0 0 0-7.522-4.802zM17.5 19a3.5 3.5 0 1 0-2.5-5.95V13a6 6 0 1 0-6 6h8.5z" />
        </g>
      </svg>
    );

  if (weatherCode === 3)
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M9.5 6a6.5 6.5 0 0 0 0 13h7a4.5 4.5 0 1 0-.957-8.898A6.502 6.502 0 0 0 9.5 6zm7 15h-7a8.5 8.5 0 1 1 7.215-12.997A6.5 6.5 0 0 1 16.5 21z" />
        </g>
      </svg>
    );

  if (weatherCode === 45 || weatherCode === 48)
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M1.584 13.007a8 8 0 0 1 14.873-5.908 5.5 5.5 0 0 1 6.52 5.908h-2.013A3.5 3.5 0 0 0 15 10.05V10a6 6 0 1 0-11.193 3.007H1.584zM4 19h17v2H4v-2zm-2-4h21v2H2v-2z" />
        </g>
      </svg>
    );

  if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55 || weatherCode === 56 || weatherCode === 57)
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M16 18v-2h1a4 4 0 1 0-2.157-7.37A6 6 0 1 0 8 15.917v2.022A8.001 8.001 0 0 1 9 2a7.998 7.998 0 0 1 6.98 4.087A6 6 0 1 1 17 18h-1zm-5.768.732L12 16.964l1.768 1.768a2.5 2.5 0 1 1-3.536 0z" />
        </g>
      </svg>
    );

  if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 66 || weatherCode === 67) {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5 16.93a8 8 0 1 1 11.458-9.831A5.5 5.5 0 0 1 19 17.793v-2.13a3.5 3.5 0 1 0-4-5.612V10a6 6 0 1 0-10 4.472v2.458zM7 16h2v4H7v-4zm8 0h2v4h-2v-4zm-4 3h2v4h-2v-4z" />
        </g>
      </svg>
    );
  }

  if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77) {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M13 16.268l1.964-1.134 1 1.732L14 18l1.964 1.134-1 1.732L13 19.732V22h-2v-2.268l-1.964 1.134-1-1.732L10 18l-1.964-1.134 1-1.732L11 16.268V14h2v2.268zM17 18v-2h.5a3.5 3.5 0 1 0-2.5-5.95V10a6 6 0 1 0-8 5.659v2.089a8 8 0 1 1 9.458-10.65A5.5 5.5 0 1 1 17.5 18l-.5.001z" />
        </g>
      </svg>
    );
  }

  if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M5 16.93a8 8 0 1 1 11.458-9.831A5.5 5.5 0 0 1 19 17.793v-2.13a3.5 3.5 0 1 0-4-5.612V10a6 6 0 1 0-10 4.472v2.458zM7 14h2v6H7v-6zm8 0h2v6h-2v-6zm-4 3h2v6h-2v-6z" />
        </g>
      </svg>
    );
  }
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-primary-700 dark:fill-primary-300 h-9 w-9"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M17 18v-2h.5a3.5 3.5 0 1 0-2.5-5.95V10a6 6 0 1 0-8 5.659v2.089a8 8 0 1 1 9.458-10.65A5.5 5.5 0 1 1 17.5 18l-.5.001zm-4-1.995h3l-5 6.5v-4.5H8l5-6.505v4.505z" />
        </g>
      </svg>
    );
  }

  return (
    <div className="mb-1 flex flex-col items-start justify-center whitespace-nowrap text-center md:items-center">
      {icon ? icon : null}
      <p className="font-semibold text-neutral-800 dark:text-neutral-50">
        {getWeatherSkyConditionsFromCode(weatherCode)}
      </p>
    </div>
  );
};

export default WeatherCardSkyConditions;
