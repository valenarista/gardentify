import CardAttribute from '@modules/common/components/cards/card-attribute';
import { Plant } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

import PlantCardContainer from './plant-card-container';

type PlantCardProps = {
  plant: Plant;
  includeContainerDetails?: boolean;
};

const PlantCard: React.FC<PlantCardProps> = (props) => {
  const { plant, includeContainerDetails = false } = props;

  return (
    <Link href={`/plants/${plant.uuid}`}>
      <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
        {/* Data */}
        <div className="relative flex flex-col">
          {includeContainerDetails && plant.container && plant.container.uuid !== undefined ? (
            <PlantCardContainer containerUuid={plant.container.uuid} />
          ) : null}
          <span className="text-md mb-2 font-bold uppercase text-neutral-800 dark:text-neutral-50">Plant</span>
          <ul className="grid grid-cols-2 gap-2">
            {/* Quantity */}
            <li>
              <CardAttribute
                attribute={plant.type}
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
            </li>

            {/* Variety */}
            <li>
              <CardAttribute
                attribute={plant.variety}
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
                    <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
                    <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
                    <line x1="12" y1="20" x2="12" y2="10" />
                  </svg>
                }
              />
            </li>
          </ul>

          {/* Seeds planted */}
          <p className="!mt-1 text-sm font-medium opacity-90">
            Seeds planted at {new Date(plant.seedsPlantedAt).toDateString()}
          </p>

          {/* Seeds sprouted */}
          <p className="!mt-1 text-sm font-medium opacity-90">
            Seeds sprouted at {new Date(plant.seedsSproutedAt).toDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
