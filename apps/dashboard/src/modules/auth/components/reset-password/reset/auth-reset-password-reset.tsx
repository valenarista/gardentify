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
    await requestResetPassword({
      variables: {
        input: {
          email: data.email,
        },
      },
      async onCompleted(requestResetPasswordResponse) {
        if (requestResetPasswordResponse.requestResetPassword.emailSent) {
          toast({ variant: 'success', content: 'Reset password email sent!' });
          await router.push('/auth');
        }
      },
      onError(error) {
        toast({ variant: 'error', content: error.message });
      },
    });
  };

  return <AuthResetPasswordForm onSubmitted={handleResetPassword} />;
};

export default AuthResetPasswordReset;
