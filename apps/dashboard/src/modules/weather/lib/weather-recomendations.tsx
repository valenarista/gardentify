import { Weather } from '@modules/graphql/@generated/graphql';

import WeatherRecomendation from '../components/recomendation/weather-recomendation';
import { WEATHER_TEMP_ALERT_THRESHOLDS, WEATHER_WIND_ALERT_THRESHOLD } from './weather-lib';

export const getWeatherRecomendations = (
  weatherForecast: Weather[]
): React.ComponentProps<typeof WeatherRecomendation>[] => [
  {
    title: 'Extreme Heat',
    content: 'Remember to water your plants this week due to major heat.',
    renderCondition: weatherForecast.some((forecast) => forecast.temperatureMax >= WEATHER_TEMP_ALERT_THRESHOLDS[1]),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-neutral-900 dark:fill-neutral-100"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fillRule="nonzero"
            d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
          />
        </g>
      </svg>
    ),
  },
  {
    title: 'Severe Cold',
    content: 'Remember to protect your plants this week due to severe cold.',
    renderCondition: weatherForecast.some((forecast) => forecast.temperatureMax <= WEATHER_TEMP_ALERT_THRESHOLDS[0]),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-neutral-900 dark:fill-neutral-100"
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
    ),
  },
  {
    title: 'High Winds',
    content: 'Protect your tall plants due to high winds expected this week.',
    renderCondition: weatherForecast.some((forecast) => forecast.windSpeedMax >= WEATHER_WIND_ALERT_THRESHOLD),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-neutral-900 dark:fill-neutral-100"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M10.5 17H4v-2h6.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 10.5 17zM5 11h13.5a3.5 3.5 0 1 1-3.278 4.73l1.873-.703A1.5 1.5 0 1 0 18.5 13H5a3 3 0 0 1 0-6h8.5a1.5 1.5 0 1 0-1.405-2.027l-1.873-.702A3.501 3.501 0 0 1 17 5.5 3.5 3.5 0 0 1 13.5 9H5a1 1 0 1 0 0 2z" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Snow Fall',
    content: 'Remember to protect your plants this week due to possible snow fall.',
    renderCondition: weatherForecast.some((forecast) =>
      Array.from([71, 73, 75, 77, 85, 86]).includes(forecast.weatherCode)
    ),
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 stroke-neutral-900 dark:stroke-neutral-100"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 4l2 1l2 -1" />
        <path d="M12 2v6.5l3 1.72" />
        <path d="M17.928 6.268l.134 2.232l1.866 1.232" />
        <path d="M20.66 7l-5.629 3.25l.01 3.458" />
        <path d="M19.928 14.268l-1.866 1.232l-.134 2.232" />
        <path d="M20.66 17l-5.629 -3.25l-2.99 1.738" />
        <path d="M14 20l-2 -1l-2 1" />
        <path d="M12 22v-6.5l-3 -1.72" />
        <path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232" />
        <path d="M3.34 17l5.629 -3.25l-.01 -3.458" />
        <path d="M4.072 9.732l1.866 -1.232l.134 -2.232" />
        <path d="M3.34 7l5.629 3.25l2.99 -1.738" />
      </svg>
    ),
  },
];
