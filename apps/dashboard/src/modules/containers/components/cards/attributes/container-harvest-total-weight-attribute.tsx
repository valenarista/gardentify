import CardAttribute from '@modules/common/components/cards/card-attribute';
import { BestPerformingContainer } from '@modules/graphql/@generated/graphql';
import React from 'react';

type ContainerHarvestTotalWeightAttributeProps = {
  totalHarvestsWeight: BestPerformingContainer['totalHarvestsWeight'];
};

const ContainerHarvestTotalWeightAttribute: React.FC<ContainerHarvestTotalWeightAttributeProps> = (props) => {
  const { totalHarvestsWeight } = props;

  return (
    <CardAttribute
      attribute={`${totalHarvestsWeight} kgrms`}
      icon={
        <svg
          className="h-5 w-5 stroke-cyan-700 dark:stroke-cyan-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
        </svg>
      }
    />
  );
};

export default ContainerHarvestTotalWeightAttribute;
