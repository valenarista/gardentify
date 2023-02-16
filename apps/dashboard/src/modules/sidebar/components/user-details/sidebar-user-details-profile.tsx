import { Button } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import Link from 'next/link';
import React from 'react';

const SidebarUserDetailsProfile: React.FC = () => {
  const { state } = useAuthContext();

  if (!state.user) return null;

  return (
    <Link href={`/users/${state.user.uuid}`}>
      <Button
        className="w-full !justify-start"
        size="lg"
        aria-label="User Profile"
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
      >
        {state.user.username}
      </Button>
    </Link>
  );
};
export default SidebarUserDetailsProfile;
