import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import { useDeleteContainerMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

const UserContainerManagementDelete: React.FC = () => {
  const router = useRouter();
  const { container } = useUserContainerContext();
  const [deleteContainer] = useDeleteContainerMutation();

  const handleContainerDelete = async () => {
    const response = await deleteContainer({
      variables: {
        input: {
          uuid: container.uuid,
        },
      },
    });

    if (response.data && response.data.deleteContainer.deleted) {
      await router.push('/containers');
    }
  };

  return <ManagementDeleteObject object="Container" onDeleted={handleContainerDelete} />;
};
export default UserContainerManagementDelete;
