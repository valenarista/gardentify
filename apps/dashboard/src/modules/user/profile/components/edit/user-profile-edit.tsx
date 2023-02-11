import { Modal } from '@gardentify/ui';
import React from 'react';

import { useUserProfileEditContext } from '../../context/edit/user-profile-edit-context';

const UserProfileEdit: React.FC = () => {
  const { isModalOpen, setIsModalOpen } = useUserProfileEditContext();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen} onModalClosed={handleModalClose} title="Edit Profile Details">
      ashe
    </Modal>
  );
};
export default UserProfileEdit;
