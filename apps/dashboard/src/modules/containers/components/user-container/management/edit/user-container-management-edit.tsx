import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

import UserContainersManagementEditForm from './user-container-management-edit-form';

const UserContainerManagementEdit: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label="Edit Container" onClick={handleOpenModal}>
        Edit Container
      </Button>
      <Modal title="Edit Container" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <UserContainersManagementEditForm onSubmitted={handleCloseModal} />
      </Modal>
    </div>
  );
};
export default UserContainerManagementEdit;
