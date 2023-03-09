import { BestPerformingContainer } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

import ContainerDirtDepthAttribute from '../attributes/container-dirt-depth-attribute';
import ContainerHarvestTotalWeightAttribute from '../attributes/container-harvest-total-weight-attribute';
import ContainerTypeAttribute from '../attributes/container-type-attribute';

type BestPerformingContainerCardProps = {
  container: BestPerformingContainer;
  index: number;
};

const BestPerformingContainerCard: React.FC<BestPerformingContainerCardProps> = (props) => {
  const { container, index } = props;

  return (
    <Link href={`/containers/${container.uuid}`}>
      <div className="group rounded-lg bg-neutral-100 p-4 transition-transform hover:scale-[103%] dark:bg-neutral-900">
        {/* Data */}
        <div className="relative flex flex-col">
          <div className="flex justify-between">
            <span className="text-md mb-2 font-bold uppercase text-neutral-800 dark:text-neutral-50">
              {index === 1 ? 'Best Container' : ' Container'}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-300 text-xl font-bold text-orange-600 shadow-md transition-all group-hover:text-2xl dark:bg-neutral-700 dark:text-orange-300">
              {index}
            </div>
          </div>
          <ul className="grid gap-2 md:grid-cols-2">
            {/* Total Harvests Weight */}
            <li className="col-span-2">
              <ContainerHarvestTotalWeightAttribute totalHarvestsWeight={container.totalHarvestsWeight} />
            </li>
            {/* Type */}
            <li>
              <ContainerTypeAttribute type={container.type} />
            </li>

            {/* Dirth Depth */}
            <li>
              <ContainerDirtDepthAttribute dirtDepth={container.dirtDepth} />
            </li>
          </ul>

          {/* Created at */}
          <p className="!mt-1 text-sm font-medium opacity-90">
            Created at {new Date(container.createdAt).toDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BestPerformingContainerCard;
