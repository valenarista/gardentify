import { Plant } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

type PlantCardProps = {
  plant: Plant;
};

const PlantCard: React.FC<PlantCardProps> = (props) => {
  const { plant } = props;

  return (
    <Link href={`/plants/${plant.uuid}`}>
      <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
        {/* Data */}
        <div className="text-center ">
          {/* Name*/}
          <h2 className="text-md font-bold uppercase">Type {plant.type}</h2>
          {/* Dirth depth */}
          <h3 className="text-sm font-medium">Variety: {plant.variety}</h3>
          {/* Planted Seeds at */}
          <p className="text-sm font-medium opacity-90">
            Planted Seeds at {new Date(plant.plantedSeedsOn as Date).toDateString()}
          </p>
          {/* Sprouted Seeds at */}
          <p className="text-sm font-medium opacity-90">
            Sprouted Seeds at {new Date(plant.seedsSproutedOn as Date).toDateString()}
          </p>
          {/* Date */}
          <p className="text-sm font-medium opacity-90">
            Created at {new Date(plant.createdAt as Date).toDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
