import { Plant } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

import PlantCardContainer from './plant-card-container';
import PlantTypeAttribute from './plant-type-attribute';
import PlantVarietyAttribute from './plant-variety-attribute';

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
              <PlantTypeAttribute type={plant.type} />
            </li>

            {/* Variety */}
            <li>
              <PlantVarietyAttribute variety={plant.variety} />
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
