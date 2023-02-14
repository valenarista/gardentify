import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

import PlantManagementEditForm from './plant-management-edit-form';

const PlantManagementEdit: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label="Edit Plant" onClick={handleOpenModal}>
        Edit Plant
      </Button>
      <Modal title="Edit Plant" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <PlantManagementEditForm />
      </Modal>
    </div>
  );
};
export default PlantManagementEdit;
