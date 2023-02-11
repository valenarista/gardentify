import React from 'react';
import { IconButton } from '../icon-button/icon-button';

type ModalCloseButtonProps = {
  /** Callback function called when the button is clicked */
  onClick: () => void;
};

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = (props) => {
  const { onClick } = props;

  return (
    <IconButton
      aria-label="Close Modal"
      colorScheme="danger"
      size="sm"
      onClick={onClick}
      icon={
        <svg
          className="w-5 h-5 fill-black dark:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </g>
        </svg>
      }
    />
  );
};
