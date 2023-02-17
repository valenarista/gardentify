import { Separator } from '@gardentify/ui';
import React from 'react';

import UserAuthEntry from './user-auth-entry';

const UserAuth: React.FC = () => {
  return (
    <div className="flex w-[350px] flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:w-[450px] md:p-6">
      <h1 className="text-3xl font-bold md:text-4xl">User Auth</h1>
      <p>Login into your account or create one with just a couple of clicks for free, or reset your password.</p>
      <div className="flex flex-col space-y-2">
        <UserAuthEntry href="/auth/login" label="Login" aria-label="Login" />
        <UserAuthEntry href="/auth/sign-up" label="Sign Up" colorScheme="secondary" aria-label="Sign Up" />
        <Separator />
        <div className="flex space-x-2">
          <UserAuthEntry
            href="/auth/reset-password"
            label="Reset Password"
            colorScheme="danger"
            variant="ghost"
            aria-label="Reset Password"
          />
          <UserAuthEntry
            href="/auth/two-factor"
            label="Setup 2FA"
            colorScheme="secondary"
            variant="ghost"
            aria-label="Two Factor"
          />
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
