import CardAttribute from '@modules/common/components/cards/card-attribute';
import { Container } from '@modules/graphql/@generated/graphql';
import React from 'react';

type ContainerTypeAttributeProps = {
  type: Container['type'];
};

const ContainerTypeAttribute: React.FC<ContainerTypeAttributeProps> = (props) => {
  const { type } = props;

  return (
    <CardAttribute
      attribute={type}
      icon={
        <svg
          className="stroke-primary-700 dark:stroke-primary-300 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      }
    />
  );
};

export default ContainerTypeAttribute;
