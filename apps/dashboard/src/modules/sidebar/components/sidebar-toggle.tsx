import { IconButton } from '@gardentify/ui';
import React from 'react';

type SidebarToggleProps = {
  onClick: () => void;
};

const SidebarToggle: React.FC<SidebarToggleProps> = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      aria-label="Toggle Sidebar"
      onClick={onClick}
      icon={
        <svg
          className="h-5 w-5 stroke-black dark:stroke-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      }
    />
  );
};

export default SidebarToggle;
