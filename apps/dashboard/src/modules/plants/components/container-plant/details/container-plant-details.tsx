import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import React from 'react';

const ContainerPlantDetails: React.FC = (props) => {
  const {} = props;

  const { plant } = useContainerPlantContext();

  return (
    <div className="flex w-full flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:flex-row md:space-x-4 md:space-y-0">
      {/* Details */}
      <div className="flex-1 flex-col">
        {/* Name */}
        <h1 className="mb-1 text-3xl font-bold">Plant</h1>
        {/* Type */}
        <h2 className="font-medium">Type: {plant.type}</h2>
        {/* Dirt depth */}
        <h3 className="font-medium">Variety: {plant.variety}</h3>
        {/* Joined at */}
        <p className="text-sm font-medium opacity-90">Created at {new Date(plant.createdAt as Date).toDateString()}</p>
      </div>
    </div>
  );
};

export default ContainerPlantDetails;
