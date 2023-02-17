import { useToast } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { AuthActionType } from '@modules/auth/context/reducer/types';
import { useSignupMutation } from '@modules/graphql/@generated/graphql';
import { useRouter } from 'next/router';
import React from 'react';

import AuthSignupForm, { AuthSignupFormData } from './auth-signup-form';

const AuthSignUp: React.FC = () => {
  const router = useRouter();
  const { dispatch } = useAuthContext();
  const { toast } = useToast();
  const [signup] = useSignupMutation();

  const handleSignUp = async (data: AuthSignupFormData) => {
    const signupData = await signup({
      variables: {
        input: {
          ...data,
        },
      },
    })
      .then((res) => {
        return res.data?.signup;
      })
      .catch((err) => {
        const errorMessage = err.message;
        toast({ variant: 'error', content: errorMessage });
      });

    if (signupData && signupData.user && signupData.user.uuid) {
      dispatch({
        type: AuthActionType.SIGNUP,
        payload: {
          user: signupData.user,
          accessToken: signupData.accessToken,
        },
      });
      await router.push(`/users/${signupData.user.uuid}`);
    }
  };

  return (
    <div className="flex w-[350px] flex-col rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 md:p-6">
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">Sign Up</h1>

      <AuthSignupForm onSubmitted={handleSignUp} />
    </div>
  );
};

export default AuthSignUp;
