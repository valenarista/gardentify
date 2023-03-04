import { Weather } from '@modules/graphql/@generated/graphql';
import { useEffect, useState } from 'react';

import WeatherRecomendation from '../components/recomendation/weather-recomendation';
import { getWeatherRecomendations } from '../lib/weather-recomendations';

const useWeatherRecomendations = (weatherForecast: Weather[]) => {
  const [recomendations, setRecomendations] = useState<React.ComponentProps<typeof WeatherRecomendation>[]>([]);

  useEffect(() => {
    const staticRecomendations = getWeatherRecomendations(weatherForecast);
    setRecomendations(staticRecomendations);
  }, [weatherForecast]);

  return { recomendations };
};

export default useWeatherRecomendations;
