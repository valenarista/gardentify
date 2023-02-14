import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

import PlantHeightRegistrationsManagementCreateForm from './plant-height-registrations-management-create-form';

const PlantHeightRegistrationsManagementCreate: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label="Create Height Registration" onClick={handleOpenModal}>
        Create Height Registration
      </Button>
      <Modal title="Create Height Registration" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <PlantHeightRegistrationsManagementCreateForm />
      </Modal>
    </div>
  );
};
export default PlantHeightRegistrationsManagementCreate;
