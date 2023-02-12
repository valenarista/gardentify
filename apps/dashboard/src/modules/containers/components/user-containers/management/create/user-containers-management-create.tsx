import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

import UserContainersManagementCreateForm from './user-containers-management-create-form';

const UserContainersManagementCreate: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label="Create Container" onClick={handleOpenModal}>
        Create Container
      </Button>
      <Modal title="Create Container" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <UserContainersManagementCreateForm />
      </Modal>
    </div>
  );
};
export default UserContainersManagementCreate;
