import CardAttribute from '@modules/common/components/cards/card-attribute';
import { HeightRegistration } from '@modules/graphql/@generated/graphql';
import React from 'react';

import HeightRegistrationCardPlantIcon from './height-registration-card-plant';

type HeightRegistrationCardProps = {
  heightRegistration: HeightRegistration;
  showPlantIcon?: boolean;
};

const HeightRegistrationCard: React.FC<HeightRegistrationCardProps> = (props) => {
  const { heightRegistration, showPlantIcon = false } = props;

  return (
    <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      {/* Data */}
      <div className="relative flex flex-col">
        {showPlantIcon && heightRegistration.plant && heightRegistration.plant.uuid !== undefined ? (
          <HeightRegistrationCardPlantIcon plantUuid={heightRegistration.plant.uuid} />
        ) : null}
        {/* Name*/}
        <h2 className="text-md mb-2 font-bold uppercase text-neutral-800 dark:text-neutral-50">Height Registration</h2>
        {/* Height */}
        <CardAttribute
          attribute={`${heightRegistration.height} cms.`}
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

        {/* Date */}
        <p className="!mt-1 text-sm font-medium opacity-90">
          Registered at {new Date(heightRegistration.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default HeightRegistrationCard;
