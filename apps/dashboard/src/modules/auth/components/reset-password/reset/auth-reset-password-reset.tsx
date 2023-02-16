import { ApolloError } from '@apollo/client';
import { useToast } from '@gardentify/ui';
import { useRequestResetPasswordMutation } from '@modules/graphql/@generated/graphql';
import React from 'react';

import AuthResetPasswordForm, { AuthResetPasswordResetFormData } from './auth-reset-password-reset-form';

const AuthResetPasswordReset: React.FC = () => {
  const { toast } = useToast();
  const [requestResetPassword] = useRequestResetPasswordMutation();

  const handleResetPassword = async (data: AuthResetPasswordResetFormData) => {
    const request = await requestResetPassword({
      variables: {
        input: {
          email: data.email,
        },
      },
    })
      .then((response) => {
        return response.data?.requestResetPassword;
      })
      .catch((err: ApolloError) => {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      });

    if (request && request.emailSent) {
      toast({ variant: 'success', content: 'Reset password email sent!' });
    }
  };

  return <AuthResetPasswordForm onSubmitted={handleResetPassword} />;
};

export default AuthResetPasswordReset;
