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
    try {
      const response = await resetPassword({
        variables: {
          input: {
            password: data.password,
            twoFactorCode: data.twoFactorCode,
            token,
          },
        },
      });

      const resetPasswordData = response.data;

      if (resetPasswordData && resetPasswordData.resetPassword.success) {
        toast({ variant: 'success', content: 'Password updated successfully!' });
        await router.push('/auth/login');
      }
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      }
    }
  };

  return <AuthResetPasswordUpdateForm onSubmitted={handleResetPassword} />;
};

export default AuthResetPasswordUpdate;
