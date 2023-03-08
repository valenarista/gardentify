import ContainerCard from '@modules/containers/components/cards/basic/container-card';
import { Container } from '@modules/graphql/@generated/graphql';
import React from 'react';

type ContainersFeedProps = {
  containers: Container[];
};

const ContainersFeed: React.FC<ContainersFeedProps> = (props) => {
  const { containers } = props;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
      }}
    >
      {containers.map((container, index) => {
        return <ContainerCard key={`container-${index}`} container={container} />;
      })}
    </div>
  );
};

export default ContainersFeed;
