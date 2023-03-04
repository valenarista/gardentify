import CardAttribute from '@modules/common/components/cards/card-attribute';
import { Plant } from '@modules/graphql/@generated/graphql';
import React from 'react';

type PlantTypeAttributeProps = {
  type: Plant['type'];
};

const PlantTypeAttribute: React.FC<PlantTypeAttributeProps> = (props) => {
  const { type } = props;

  return (
    <CardAttribute
      attribute={type}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-primary-700 dark:stroke-primary-300 h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 15h10v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-4z" />
          <path d="M12 9a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
          <path d="M12 11a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
          <line x1="12" y1="15" x2="12" y2="9" />
        </svg>
      }
    />
  );
};

export default PlantTypeAttribute;
