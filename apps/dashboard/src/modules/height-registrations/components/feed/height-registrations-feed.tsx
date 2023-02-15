import { HeightRegistration } from '@modules/graphql/@generated/graphql';
import React from 'react';

import HeightRegistrationCard from '../cards/height-registration-card';

type HeightRegistrationsFeedProps = {
  heightRegistrations: HeightRegistration[];
};

const HeightRegistrationsFeed: React.FC<HeightRegistrationsFeedProps> = (props) => {
  const { heightRegistrations } = props;

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))',
      }}
    >
      {heightRegistrations.map((heightRegistration, index) => {
        return <HeightRegistrationCard key={`height-registration-${index}`} heightRegistration={heightRegistration} />;
      })}
    </div>
  );
};

export default HeightRegistrationsFeed;
