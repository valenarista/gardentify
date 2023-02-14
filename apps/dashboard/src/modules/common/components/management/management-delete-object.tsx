import { Button, Modal } from '@gardentify/ui';
import React, { useState } from 'react';

type ManagementDeleteObjectProps = {
  /** Name of the object */
  object: string;
  /** Callback function called when delete button is clicked */
  onDeleted: () => void;
};

const ManagementDeleteObject: React.FC<ManagementDeleteObjectProps> = (props) => {
  const { object, onDeleted } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button aria-label={`Delete ${object}`} onClick={handleOpenModal} colorScheme="danger">
        Delete {object}
      </Button>
      <Modal title={`Delete ${object}`} isModalOpen={modalOpen} onModalClosed={handleCloseModal}>
        <div className="space-y-4">
          <p>
            Are you sure you want to delete this {object}?. This action cannot be{' '}
            <span className="border-b-2 border-red-600 font-bold text-red-600 dark:border-red-400 dark:text-red-400">
              undone
            </span>
            .
          </p>
          <div className="flex w-full space-x-4 px-6">
            <Button className="w-full" onClick={handleCloseModal}>
              Go Back
            </Button>
            <Button className="w-full" variant="ghost" colorScheme="danger" onClick={onDeleted}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ManagementDeleteObject;
