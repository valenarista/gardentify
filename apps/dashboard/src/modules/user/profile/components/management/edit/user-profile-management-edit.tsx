import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

const UserProfileManagementEdit: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label="Edit Profile" onClick={handleOpenModal}>
        Edit Profile
      </Button>
      <Modal title="  Edit Profile" isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        Hi
      </Modal>
    </div>
  );
};
export default UserProfileManagementEdit;
