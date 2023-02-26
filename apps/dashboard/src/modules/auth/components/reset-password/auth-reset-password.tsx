import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import AuthHeader from '../auth-header';
import AuthResetPasswordReset from './reset/auth-reset-password-reset';
import AuthResetPasswordUpdate from './update/auth-reset-password-update';

const AuthResetPassword: React.FC = () => {
  const router = useRouter();

  const resetPasswordToken = router.query.token;

  return (
    <div className="flex w-[350px] flex-col space-y-2 rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:w-[450px] md:p-6">
      {resetPasswordToken !== undefined ? (
        <>
          <AuthHeader title="Update Password" href="/auth" />
          <p>
            Enter your new password and the verificatino code in your 2FA app. Keep in mind that you need 2FA. You cant
            setup yours here:{' '}
            <Link className="font-bold text-red-800 dark:text-red-400" href="/auth/two-factor">
              Setup now
            </Link>
          </p>
          <AuthResetPasswordUpdate token={resetPasswordToken as string} />
        </>
      ) : (
        <>
          <AuthHeader title="Reset Password" href="/auth" />
          <p>
            Enter the email of your account and you will receive an email with the instructions to reset the password.
          </p>
          <AuthResetPasswordReset />
        </>
      )}
    </div>
  );
};

export default AuthResetPassword;
