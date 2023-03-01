import { IconButton } from '@gardentify/ui';
import { Harvest, Plant } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

import HarvestCardAttribute from './harvest-card-attribute';

type HarvestCardPlantIconProps = {
  plantUuid: Plant['uuid'];
};

const HarvestCardPlantIcon: React.FC<HarvestCardPlantIconProps> = (props) => {
  const { plantUuid } = props;

  return (
    <div className="absolute right-0 top-0">
      <Link href={`/plants/${plantUuid}`}>
        <IconButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-100"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 15h10v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-4z" />
              <path d="M12 9a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
              <path d="M12 11a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
              <line x1="12" y1="15" x2="12" y2="9" />
            </svg>
          }
        />
      </Link>
    </div>
  );
};

type HarvestCardProps = {
  harvest: Harvest;
  showPlantIcon?: boolean;
};

const HarvestCard: React.FC<HarvestCardProps> = (props) => {
  const { harvest, showPlantIcon = false } = props;

  return (
    <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      {/* Data */}
      <div className="relative flex flex-col space-y-2">
        {showPlantIcon && harvest.plant && harvest.plant.uuid !== undefined ? (
          <HarvestCardPlantIcon plantUuid={harvest.plant.uuid} />
        ) : null}
        {/* Name*/}
        <h2 className="text-md decoration-primary-300 !mt-0 font-bold uppercase">Harvest</h2>
        {/* Quantity */}
        <HarvestCardAttribute
          attribute={`${harvest.quantity} units.`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-100"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="7 10 12 4 17 10" />
              <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z" />
              <circle cx="12" cy="15" r="2" />
            </svg>
          }
        />

        {/* Weight */}
        <HarvestCardAttribute
          attribute={`${harvest.weight} kilograms.`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-100"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="6" r="3" />
              <path d="M6.835 9h10.33a1 1 0 0 1 .984 .821l1.637 9a1 1 0 0 1 -.984 1.179h-13.604a1 1 0 0 1 -.984 -1.179l1.637 -9a1 1 0 0 1 .984 -.821z" />
            </svg>
          }
        />

        {/* Date */}
        <p className="!mt-1 text-sm font-medium opacity-90">
          Harvested at {new Date(harvest.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default HarvestCard;
