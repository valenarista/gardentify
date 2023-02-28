import { Harvest } from '@modules/graphql/@generated/graphql';
import React from 'react';

type HarvestCardProps = {
  harvest: Harvest;
};

const HarvestCard: React.FC<HarvestCardProps> = (props) => {
  const { harvest } = props;

  return (
    <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      {/* Data */}
      <div className="text-center ">
        {/* Name*/}
        <h2 className="text-md font-bold uppercase">Harvest</h2>
        {/* Quantity */}
        <h3 className="text-sm font-medium">Quantity: {harvest.quantity} units</h3>
        {/* Weight */}
        <h3 className="text-sm font-medium">Weight: {harvest.weight} kgrms.</h3>
        {/* Date */}
        <p className="text-sm font-medium opacity-90">Harvesteed at {new Date(harvest.createdAt).toDateString()}</p>
      </div>
    </div>
  );
};

export default HarvestCard;
