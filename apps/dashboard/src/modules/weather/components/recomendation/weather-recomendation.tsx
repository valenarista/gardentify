import React from 'react';

type WeatherRecomendationProps = {
  title: string;
  content: string;
  renderCondition: boolean;
  icon: React.ReactElement;
};

const WeatherRecomendation: React.FC<WeatherRecomendationProps> = (props) => {
  const { title, content, renderCondition, icon } = props;

  if (!renderCondition) return null;

  return (
    <div className="flex items-center space-x-2 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      <div className="rounded-lg bg-red-300 p-2 dark:bg-red-800">{icon}</div>
      <div className="flex flex-col items-start justify-center">
        <h4 className="font-semibold">{title}</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default WeatherRecomendation;
