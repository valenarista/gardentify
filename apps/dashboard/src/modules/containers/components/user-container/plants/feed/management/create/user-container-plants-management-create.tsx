import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

import UserContainerPlantsManagementCreateForm from './user-container-plants-management-create-form';

const UserContainerPlantsManagementCreate: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label="Create Plant" onClick={handleOpenModal}>
        Create Plant
      </Button>
      <Modal title="Create Plant" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <UserContainerPlantsManagementCreateForm onSubmitted={handleCloseModal} />
      </Modal>
    </div>
  );
};
export default UserContainerPlantsManagementCreate;
