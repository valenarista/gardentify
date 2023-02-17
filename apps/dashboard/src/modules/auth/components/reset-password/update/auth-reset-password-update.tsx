import { ApolloError } from '@apollo/client';
import { useToast } from '@gardentify/ui';
import { useResetPasswordMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthResetPasswordUpdateForm, { AuthResetPasswordUpdateFormData } from './auth-reset-password-update-form';

type AuthResetPasswordUpdateProps = {
  token: string;
};

const AuthResetPasswordUpdate: React.FC<AuthResetPasswordUpdateProps> = (props) => {
  const { token } = props;
  const router = useRouter();
  const { toast } = useToast();
  const [resetPassword] = useResetPasswordMutation();

  const handleResetPassword = async (data: AuthResetPasswordUpdateFormData) => {
    const reset = await resetPassword({
      variables: {
        input: {
          password: data.password,
          twoFactorCode: data.twoFactorCode,
          token,
        },
      },
    })
      .then((response) => {
        return response.data?.resetPassword;
      })
      .catch((err: ApolloError) => {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      });

    if (reset && reset.success) {
      toast({ variant: 'success', content: 'Password updated successfully!' });
      await router.push('/auth/login');
    }
  };

  return <AuthResetPasswordUpdateForm onSubmitted={handleResetPassword} />;
};

export default AuthResetPasswordUpdate;
