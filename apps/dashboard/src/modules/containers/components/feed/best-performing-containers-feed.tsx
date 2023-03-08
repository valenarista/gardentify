import { BestPerformingContainer } from '@modules/graphql/@generated/graphql';
import React from 'react';

import BestPerformingContainerCard from '../cards/best-performing/best-performing-container-card';

type BestPerformingContainersFeedProps = {
  containers: BestPerformingContainer[];
};

const BestPerformingContainersFeed: React.FC<BestPerformingContainersFeedProps> = (props) => {
  const { containers } = props;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
      }}
    >
      {containers.map((container, index) => {
        return <BestPerformingContainerCard key={`container-${index}`} container={container} index={index + 1} />;
      })}
    </div>
  );
};

export default BestPerformingContainersFeed;
