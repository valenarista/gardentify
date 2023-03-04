import { useToast } from '@gardentify/ui';
import { useRequestResetPasswordMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthResetPasswordForm, { AuthResetPasswordResetFormData } from './auth-reset-password-reset-form';

const AuthResetPasswordReset: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [requestResetPassword] = useRequestResetPasswordMutation();

  const handleResetPassword = async (data: AuthResetPasswordResetFormData) => {
    try {
      const response = await requestResetPassword({
        variables: {
          input: {
            email: data.email,
          },
        },
      });

      const requestResetPasswordData = response.data;

      if (requestResetPasswordData && requestResetPasswordData.requestResetPassword.emailSent) {
        toast({ variant: 'success', content: 'Reset password email sent!' });
        await router.push('/auth');
      }
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      }
    }
  };

  return <AuthResetPasswordForm onSubmitted={handleResetPassword} />;
};

export default AuthResetPasswordReset;
