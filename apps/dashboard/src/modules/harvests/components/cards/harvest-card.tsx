import CardAttribute from '@modules/common/components/cards/card-attribute';
import { Harvest } from '@modules/graphql/@generated/graphql';
import clsx from 'clsx';
import React from 'react';

import HarvestCardPlantIcon from './harvest-card-plant';

type HarvestCardProps = {
  harvest: Harvest;
  includePlantDetails?: boolean;
};

const HarvestCard: React.FC<HarvestCardProps> = (props) => {
  const { harvest, includePlantDetails = false } = props;

  return (
    <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      {/* Data */}
      <div className="relative flex flex-col">
        {includePlantDetails && harvest.plant && harvest.plant.uuid !== undefined ? (
          <HarvestCardPlantIcon plantUuid={harvest.plant.uuid} />
        ) : null}
        {/* Name*/}
        <span className="text-md font-bold uppercase text-neutral-800 dark:text-neutral-50">Harvest</span>
        <ul className={clsx('grid gap-2', includePlantDetails ? 'mt-2.5 grid-cols-2' : 'mt-2')}>
          {/* Plant Type */}
          {harvest.plant && harvest.plant.uuid !== undefined ? (
            <li>
              <CardAttribute
                attribute={`${harvest.plant.type.toLocaleUpperCase()}`}
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
                    <circle cx="17.5" cy="17.5" r="2.5" />
                    <path d="M6 8v11a1 1 0 0 0 1.806 .591l3.694 -5.091v.055" />
                    <path d="M6 8h15l-3.5 7l-7.1 -.747a4 4 0 0 1 -3.296 -2.493l-2.853 -7.13a1 1 0 0 0 -.928 -.63h-1.323" />
                  </svg>
                }
              />
            </li>
          ) : null}
          {/* Quantity */}
          <li>
            <CardAttribute
              attribute={`${harvest.quantity} units`}
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
          </li>

          {/* Weight */}
          <li>
            <CardAttribute
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
          </li>
        </ul>

        {/* Date */}
        <p className="!mt-1 text-sm font-medium opacity-90">
          Harvested at {new Date(harvest.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default HarvestCard;
