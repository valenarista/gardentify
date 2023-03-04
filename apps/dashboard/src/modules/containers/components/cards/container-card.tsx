import { Container } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

import ContainerDirtDepthAttribute from './container-dirt-depth-attribute';
import ContainerTypeAttribute from './container-type-attribute';

type ContainerCardProps = {
  container: Container;
};

const ContainerCard: React.FC<ContainerCardProps> = (props) => {
  const { container } = props;

  return (
    <Link href={`/containers/${container.uuid}`}>
      <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
        {/* Data */}
        <div className="relative flex flex-col">
          <span className="text-md mb-2 font-bold uppercase text-neutral-800 dark:text-neutral-50">Container</span>
          <ul
            className="grid gap-2"
            style={{
              gridTemplateColumns: '1fr auto',
            }}
          >
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

export default ContainerCard;
