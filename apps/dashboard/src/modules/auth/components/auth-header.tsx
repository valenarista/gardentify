import { IconButton } from '@gardentify/ui';
import Link from 'next/link';
import React from 'react';

type AuthAuthHeaderProps = {
  title: string;
  href: string;
};

const AuthHeader: React.FC<AuthAuthHeaderProps> = (props) => {
  const { title, href } = props;

  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
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
    </div>
  );
};

export default AuthHeader;
