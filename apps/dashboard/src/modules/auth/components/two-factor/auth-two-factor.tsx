import { useToast } from '@gardentify/ui';
import { useSetupTwoFactorCodeMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthHeader from '../auth-header';
import AuthTwoFactorForm, { AuthTwoFactorFormData } from './auth-two-factor-form';

const AuthTwoFactor: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [setupTwoFactorCode] = useSetupTwoFactorCodeMutation();

  const handleTwoFactorSetup = async (data: AuthTwoFactorFormData) => {
    const twoFactorSetup = await setupTwoFactorCode({
      variables: {
        input: {
          ...data,
        },
      },
    })
      .then((res) => {
        return res.data?.setupTwoFactorCode;
      })
      .catch((err) => {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      });

    if (twoFactorSetup && twoFactorSetup.emailSent) {
      toast({ variant: 'success', content: 'Two factor mail sent!' });
      await router.push(`/auth/login`);
    }
  };

  return (
    <div className="flex w-[350px] flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:w-[450px] md:p-6">
      <AuthHeader title="Setup 2FA" href="/auth" />
      <p className="mb-1.5">
        Keep in mind that if you already have 2FA enabled, your current 2FA will be replace with a new one!
      </p>
      <AuthTwoFactorForm onSubmitted={handleTwoFactorSetup} />
    </div>
  );
};

export default AuthTwoFactor;
