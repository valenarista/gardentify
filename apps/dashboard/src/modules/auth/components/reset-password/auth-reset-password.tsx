import { useRouter } from 'next/router';
import React from 'react';

import AuthResetPasswordReset from './reset/auth-reset-password-reset';
import AuthResetPasswordUpdate from './update/auth-reset-password-update';

const AuthResetPassword: React.FC = () => {
  const router = useRouter();

  const resetPasswordToken = router.query.token;

  return (
    <div className="flex w-[350px] flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:p-6">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">Reset Password</h1>

      {resetPasswordToken !== undefined ? (
        <AuthResetPasswordUpdate token={resetPasswordToken as string} />
      ) : (
        <AuthResetPasswordReset />
      )}
    </div>
  );
};

export default AuthResetPassword;
