import { Container } from '@modules/graphql/@generated/graphql';
import React, { useEffect } from 'react';

import { useUserContainerContext } from '../context/user-container-context';
import UserContainerDetails from './details/user-container-details';

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
    <div className="container mx-auto flex max-w-6xl flex-col space-y-4 px-2 md:px-4 lg:px-6">
      <UserContainerDetails />
    </div>
  );
};

export default UserContainer;
