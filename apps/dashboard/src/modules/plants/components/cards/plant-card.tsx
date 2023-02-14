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
            Seeds Planted at {new Date(plant.seedsPlantedAt).toDateString()}
          </p>
          {/* Sprouted Seeds at */}
          <p className="text-sm font-medium opacity-90">
            Seeds Sprouted at {new Date(plant.seedsSproutedAt).toDateString()}
          </p>
          {/* Date */}
          <p className="text-sm font-medium opacity-90">Created at {new Date(plant.createdAt).toDateString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlantCard;
