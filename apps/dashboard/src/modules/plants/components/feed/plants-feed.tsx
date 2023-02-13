import { Plant } from '@modules/graphql/@generated/graphql';
import React from 'react';

import PlantCard from '../cards/plant-card';

type PlantsFeedProps = {
  plants: Plant[];
};

const PlantsFeed: React.FC<PlantsFeedProps> = (props) => {
  const { plants } = props;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
      }}
    >
      {plants.map((plant, index) => {
        return <PlantCard key={`plant-${index}`} plant={plant} />;
      })}
    </div>
  );
};

export default PlantsFeed;
