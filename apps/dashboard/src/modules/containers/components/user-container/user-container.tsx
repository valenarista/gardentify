import { Container } from '@modules/graphql/@generated/graphql';
import React, { useEffect } from 'react';

import { useUserContainerContext } from '../../context/user-container-context';
import UserContainerDetails from './details/user-container-details';
import UserContainerHarvests from './harvests/user-container-harvests';
import UserContainerPlantsFeed from './plants/feed/user-container-plants-feed';
import UserContainerPlantsTypes from './plants/types/user-container-plants-types';
import UserContainerStats from './stats/user-container-stats';

type UserContainerProps = {
  container: Container;
};

const UserContainer: React.FC<UserContainerProps> = (props) => {
  const { container } = props;
  const { setContainer } = useUserContainerContext();

  useEffect(() => {
    setContainer(container);
  }, [container]);

  return (
    <section className="container mx-auto flex max-w-6xl flex-col space-y-4 md:px-4 lg:px-6">
      <UserContainerDetails />
      <UserContainerStats />
      <UserContainerPlantsFeed initialTake={6} />
      <div className="grid gap-4 lg:grid-cols-2">
        <UserContainerPlantsTypes />
        <UserContainerHarvests />
      </div>
    </section>
  );
};

export default UserContainer;
