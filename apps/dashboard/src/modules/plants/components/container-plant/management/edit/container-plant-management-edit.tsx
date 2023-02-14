import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

import UserContainersManagementEditForm from './container-plant-management-edit-form';

const ContainerPlantManagementEdit: React.FC = () => {
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
        Edit Plant
      </Button>
      <Modal title="Edit Container" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <UserContainersManagementEditForm />
      </Modal>
    </div>
  );
};
export default ContainerPlantManagementEdit;
