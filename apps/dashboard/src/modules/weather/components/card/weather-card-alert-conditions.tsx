import React from 'react';

type WeatherCardAlertConditionsProps = {
  alertType: 'cold' | 'hot';
};

const WeatherCardAlertConditions: React.FC<WeatherCardAlertConditionsProps> = (props) => {
  const { alertType } = props;

  return (
    <div className="absolute top-0 right-0 m-4 rounded-lg bg-neutral-200 p-1 dark:bg-neutral-800">
      {alertType === 'cold' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 fill-blue-700 dark:fill-blue-300"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 10.255V5a4 4 0 1 1 8 0v5.255a7 7 0 1 1-8 0zM8 16a4 4 0 1 0 8 0H8z" />
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 fill-red-700 dark:fill-red-300"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M8 10.255V5a4 4 0 1 1 8 0v5.255a7 7 0 1 1-8 0zm3 1.871A4.002 4.002 0 0 0 12 20a4 4 0 0 0 1-7.874V5h-2v7.126z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default WeatherCardAlertConditions;
