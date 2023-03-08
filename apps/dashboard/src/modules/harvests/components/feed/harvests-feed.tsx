import { Harvest } from '@modules/graphql/@generated/graphql';
import React from 'react';

import HarvestCard from '../cards/harvest-card';

type HarvestsFeedProps = {
  harvests: Harvest[];
  includePlantDetails: boolean;
};

const HarvestsFeed: React.FC<HarvestsFeedProps> = (props) => {
  const { harvests, includePlantDetails } = props;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
      }}
    >
      {harvests.map((harvest, index) => {
        return <HarvestCard key={`harvest-${index}`} harvest={harvest} includePlantDetails={includePlantDetails} />;
      })}
    </div>
  );
};

export default HarvestsFeed;
