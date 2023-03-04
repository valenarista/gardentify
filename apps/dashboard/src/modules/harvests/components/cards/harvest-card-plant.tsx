import { IconButton } from '@gardentify/ui';
import { Plant } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

type HarvestCardPlantIconProps = {
  plantUuid: Plant['uuid'];
};

const HarvestCardPlantIcon: React.FC<HarvestCardPlantIconProps> = (props) => {
  const { plantUuid } = props;

  return (
    <div className="absolute right-0 top-0">
      <Link href={`/plants/${plantUuid}`}>
        <IconButton
          size="sm"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-neutral-900 dark:stroke-neutral-100"
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
      </Link>
    </div>
  );
};

export default HarvestCardPlantIcon;
