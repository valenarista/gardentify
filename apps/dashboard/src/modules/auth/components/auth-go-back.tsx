import { IconButton } from '@gardentify/ui';
import Link from 'next/link';
import React from 'react';

type AuthGoBackProps = {
  href: string;
};

const AuthGoBack: React.FC<AuthGoBackProps> = (props) => {
  const { href } = props;

  return (
    <Link href={href}>
      <IconButton
        aria-label="Go Back"
        variant="ghost"
        colorScheme="secondary"
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
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        }
      />
    </Link>
  );
};

export default AuthGoBack;
