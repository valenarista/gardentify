import { Container } from '@modules/graphql/@generated/graphql';
import React, { useEffect } from 'react';

import { useUserContainerContext } from '../../context/user-container-context';
import UserContainerDetails from './details/user-container-details';
import UserContainerPlants from './plants/user-container-plants';

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
      <UserContainerPlants />
    </section>
  );
};

export default UserContainer;
