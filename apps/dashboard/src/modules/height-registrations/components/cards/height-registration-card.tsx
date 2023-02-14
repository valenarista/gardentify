import { HeightRegistration } from '@modules/graphql/@generated/graphql';
import React from 'react';

type HeightRegistrationCardProps = {
  heightRegistration: HeightRegistration;
};

const HeightRegistrationCard: React.FC<HeightRegistrationCardProps> = (props) => {
  const { heightRegistration } = props;

  return (
    <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      {/* Data */}
      <div className="text-center ">
        {/* Name*/}
        <h2 className="text-md font-bold uppercase">Height Registration</h2>
        {/* Height */}
        <h3 className="text-sm font-medium">Height: {heightRegistration.height} cms</h3>
        {/* Date */}
        <p className="text-sm font-medium opacity-90">
          Registered at {new Date(heightRegistration.createdAt).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default HeightRegistrationCard;
