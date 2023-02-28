import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

import PlantHarvestsManagementCreateForm from './plant-harvests-management-create-form';

const PlantHarvestsManagementCreate: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label="Create Harvest" onClick={handleOpenModal}>
        Create Harvest
      </Button>
      <Modal title="Create Harvest" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <PlantHarvestsManagementCreateForm />
      </Modal>
    </div>
  );
};
export default PlantHarvestsManagementCreate;
