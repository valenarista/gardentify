import { IconButton } from '@gardentify/ui';
import { Container } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

type PlantCardContainerProps = {
  containerUuid: Container['uuid'];
};

const PlantCardContainer: React.FC<PlantCardContainerProps> = (props) => {
  const { containerUuid } = props;

  return (
    <div className="absolute right-0 top-0">
      <Link href={`/containers/${containerUuid}`}>
        <IconButton
          icon={
            <svg
              className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-100"
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
      </Link>
    </div>
  );
};

export default PlantCardContainer;
