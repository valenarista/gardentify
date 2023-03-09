import { Button } from '@gardentify/ui';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type UserProfileDetailsTwoFactorProps = {
  twoFactorEnabled: boolean;
};

const UserProfileDetailsTwoFactor: React.FC<UserProfileDetailsTwoFactorProps> = (props) => {
  const { twoFactorEnabled } = props;

  return (
    <div className="flex items-center space-x-2">
      <div className="rounded-md bg-neutral-300 p-0.5 shadow-md dark:bg-neutral-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            'h-7 w-7',
            twoFactorEnabled ? 'stroke-cyan-700 dark:stroke-cyan-300' : 'stroke-red-700 dark:stroke-red-300'
          )}
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 16h-4l3.47 -4.66a2 2 0 1 0 -3.47 -1.54" />
          <path d="M10 16v-8h4" />
          <line x1="10" y1="12" x2="13" y2="12" />
          <path d="M17 16v-6a2 2 0 0 1 4 0v6" />
          <line x1="17" y1="13" x2="21" y2="13" />
        </svg>
      </div>
      <span className="font-semibold text-neutral-800 dark:text-neutral-50">
        {twoFactorEnabled ? 'Enabled' : 'Disabled'}
      </span>
      {!twoFactorEnabled ? (
        <Link href="/auth/two-factor">
          <Button size="sm" colorScheme="secondary">
            Setup
          </Button>
        </Link>
      ) : null}
    </div>
  );
};

export default UserProfileDetailsTwoFactor;
