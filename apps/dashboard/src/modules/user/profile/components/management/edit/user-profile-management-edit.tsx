import { Button, Modal } from '@gardentify/ui';
import { useUserProfileEditContext } from '@modules/user/profile/context/edit/user-profile-edit-context';
import React from 'react';

const UserProfileManagementEdit: React.FC = () => {
  const { isModalOpen, setIsModalOpen } = useUserProfileEditContext();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Edit Profile
        </Button>
      </div>
      <Modal isModalOpen={isModalOpen} onModalClosed={handleModalClose} title="Edit Profile Details">
        ashe
      </Modal>
    </>
  );
};
export default UserProfileManagementEdit;
