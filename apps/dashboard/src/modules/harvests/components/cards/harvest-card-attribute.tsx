import React from 'react';

type HarvestCardAttributeProps = {
  attribute: React.ReactElement | JSX.Element | string;
  icon: React.ReactElement;
};

const HarvestCardAttribute: React.FC<HarvestCardAttributeProps> = (props) => {
  const { attribute, icon } = props;

  return (
    <div className="flex items-center space-x-1">
      <span className="rounded-md bg-neutral-300 p-1 shadow-md dark:bg-neutral-700">{icon}</span>
      <h3 className="text-sm font-semibold">{attribute}</h3>
    </div>
  );
};

export default HarvestCardAttribute;
