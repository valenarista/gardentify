import { Container } from '@modules/graphql/@generated/graphql';
import Link from 'next/link';
import React from 'react';

type ContainerCardProps = {
  container: Container;
};

const ContainerCard: React.FC<ContainerCardProps> = (props) => {
  const { container } = props;

  return (
    <Link href={`/containers/${container.uuid}`}>
      <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
        {/* Data */}
        <div className="text-center ">
          {/* Name*/}
          <h2 className="text-md font-bold uppercase">Type {container.type}</h2>
          {/* Dirth depth */}
          <h3 className="text-sm font-medium">Dirth Depth: {container.dirtDepth} cms</h3>
          {/* Date */}
          <p className="text-sm font-medium opacity-90">Created at {new Date(container.createdAt).toDateString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ContainerCard;
