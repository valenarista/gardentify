import { Button, Modal } from '@gardentify/ui';
import { useUserContainerContext } from '@modules/containers/context/user-container-context';
import { useDeleteContainerMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const UserContainerManagementDelete: React.FC = () => {
  const router = useRouter();
  const { container } = useUserContainerContext();
  const [deleteContainer] = useDeleteContainerMutation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label="Delete Container" onClick={handleOpenModal} colorScheme="danger">
        Delete Container
      </Button>
      <Modal title="Delete Container" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <div className="space-y-4">
          <p>
            Are you sure you want to delete this container?. This action cannot be{' '}
            <span className="border-b-2 border-red-600 font-bold text-red-600 dark:border-red-400 dark:text-red-400">
              undone
            </span>
            .
          </p>
          <div className="flex w-full space-x-4 px-6">
            <Button className="w-full" onClick={handleCloseModal}>
              Go Back
            </Button>
            <Button className="w-full" variant="ghost" colorScheme="danger" onClick={handleContainerDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default UserContainerManagementDelete;
