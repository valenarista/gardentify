import CardAttribute from '@modules/common/components/cards/card-attribute';
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
              <CardAttribute
                attribute={container.type}
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
            </li>

            {/* Dirth Depth */}
            <li>
              <CardAttribute
                attribute={`${container.dirtDepth} cms depth`}
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1" />
                    <line x1="4" y1="8" x2="6" y2="8" />
                    <line x1="4" y1="12" x2="7" y2="12" />
                    <line x1="4" y1="16" x2="6" y2="16" />
                    <line x1="8" y1="4" x2="8" y2="6" />
                    <polyline points="12 4 12 7 " />
                    <polyline points="16 4 16 6 " />
                  </svg>
                }
              />
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
