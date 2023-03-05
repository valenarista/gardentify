import { Weather } from '@modules/graphql/@generated/graphql';
import { useEffect, useState } from 'react';

import WeatherRecomendation from '../components/recomendation/weather-recomendation';
import { getWeatherRecomendations } from '../lib/weather-recomendations';

const useWeatherRecomendations = (initialWeatherForecast: Weather[]) => {
  const [weatherForecast, setWeatherForecast] = useState<Weather[]>(initialWeatherForecast);
  const [recomendations, setRecomendations] = useState<React.ComponentProps<typeof WeatherRecomendation>[]>([]);

  useEffect(() => {
    const staticRecomendations = getWeatherRecomendations(weatherForecast);
    setRecomendations(staticRecomendations);
  }, [weatherForecast]);

  const updateWeatherForecast = (forecast: Weather[]) => {
    setWeatherForecast(forecast);
  };

  return { recomendations, updateWeatherForecast };
};

export default useWeatherRecomendations;
