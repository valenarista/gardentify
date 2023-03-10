import { useAuthContext } from '@modules/auth/context/auth-context';
import { Container } from '@modules/graphql/@generated/graphql';
import React from 'react';

import UserContainerPlantsManagementCreate from '../feed/management/create/user-container-plants-management-create';

type UserContainerPlantsDetailedHeaderProps = {
  container: Container;
};

const UserContainerPlantsDetailedHeader: React.FC<UserContainerPlantsDetailedHeaderProps> = (props) => {
  const { container } = props;
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
      <h2 className="text-2xl font-bold">Container Plants</h2>
      {/* Management */}
      {container.user && user && user.uuid === container.user.uuid ? <UserContainerPlantsManagementCreate /> : null}
    </div>
  );
};

export default UserContainerPlantsDetailedHeader;
