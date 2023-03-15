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
    await resetPassword({
      variables: {
        input: {
          password: data.password,
          twoFactorCode: data.twoFactorCode,
          token,
        },
      },
      async onCompleted(resetPasswordResponse) {
        if (resetPasswordResponse.resetPassword.success) {
          toast({ variant: 'success', content: 'Password resetted successfully!' });
          await router.push('/auth');
        }
      },
      onError(error) {
        toast({ variant: 'error', content: error.message });
      },
    });
  };

  return <AuthResetPasswordUpdateForm onSubmitted={handleResetPassword} />;
};

export default AuthResetPasswordUpdate;
