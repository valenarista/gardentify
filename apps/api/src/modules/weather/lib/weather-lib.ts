export type WeatherDailyUnits = {
  time: string;
  weathercode: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  uv_index_max: string;
  precipitation_sum: string;
  windspeed_10m_max: string;
  winddirection_10m_dominant: string;
};

export type WeatherForecastData = {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  uv_index_max: number[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
  winddirection_10m_dominant: number[];
};

export type WeatherForecastApiResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  daily_units: WeatherDailyUnits;
  daily: WeatherForecastData;
};
