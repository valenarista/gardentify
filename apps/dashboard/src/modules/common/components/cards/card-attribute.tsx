import React from 'react';

type CardAttributeProps = {
  attribute: React.ReactElement | JSX.Element | string | number;
  icon: React.ReactElement;
};

const CardAttribute: React.FC<CardAttributeProps> = (props) => {
  const { attribute, icon } = props;

  return (
    <div className="flex items-center space-x-2">
      <div className="rounded-md bg-neutral-300 p-1 shadow-md dark:bg-neutral-700">{icon}</div>
      <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-50">{attribute}</span>
    </div>
  );
};

export default CardAttribute;
