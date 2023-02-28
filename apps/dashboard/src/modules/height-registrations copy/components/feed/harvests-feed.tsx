import { Harvest } from '@modules/graphql/@generated/graphql';
import React from 'react';

import HarvestCard from '../cards/harvest-card';

type HarvestsFeedProps = {
  harvests: Harvest[];
};

const HarvestsFeed: React.FC<HarvestsFeedProps> = (props) => {
  const { harvests } = props;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
      }}
    >
      {harvests.map((harvest, index) => {
        return <HarvestCard key={`harvest-${index}`} harvest={harvest} />;
      })}
    </div>
  );
};

export default HarvestsFeed;
